import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import { hash, verify } from '@node-rs/argon2';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import { eq, gte, lt, lte } from 'drizzle-orm';
import { err } from 'neverthrow';
import cron from 'node-cron';

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const sessionCookieName = 'HoshiAnime_authSession';

cron.schedule('0 2 1,15 * *', async () => {
	console.log('Clean session table:', new Date().toISOString());
	console.log('Removed:');
	console.log(
		await db.delete(table.session).where(lte(table.session.expiresAt, new Date())).returning()
	);
});

export async function createSession(userId: string) {
	const [session] = await db
		.insert(table.session)
		.values({
			userId
		})
		.returning();
	return session;
}

export async function validateSessionToken(sessionId: string) {
	const [result] = await db
		.select({
			// Adjust user table here to tweak returned data
			user: { id: table.user.id, username: table.user.username },
			session: table.session
		})
		.from(table.session)
		.innerJoin(table.user, eq(table.session.userId, table.user.id))
		.where(eq(table.session.id, sessionId));

	if (!result) {
		return { session: null, user: null };
	}
	const { session, user } = result;

	const sessionExpired = Date.now() >= session.expiresAt.getTime();
	if (sessionExpired) {
		await db.delete(table.session).where(eq(table.session.id, session.id));
		return { session: null, user: null };
	}

	const renewSession = Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
	if (renewSession) {
		session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
		await db
			.update(table.session)
			.set({ expiresAt: session.expiresAt })
			.where(eq(table.session.id, session.id));
	}

	return { session, user };
}

export type SessionValidationResult = Awaited<ReturnType<typeof validateSessionToken>>;

export async function invalidateSession(sessionId: string) {
	await db.delete(table.session).where(eq(table.session.id, sessionId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date) {
	event.cookies.set(sessionCookieName, token, {
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.delete(sessionCookieName, {
		path: '/'
	});
}

const hashSettings = {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1
};

export async function hashPassword(password: string) {
	return await hash(password, hashSettings);
}

export async function verifyPassword(hash: string, password: string) {
	return await verify(hash, password, hashSettings);
}

type LoginProps = {
	username: string;
	password: string;
};

export async function login({ username, password }: LoginProps, event: RequestEvent) {
	const userData = await db.query.user.findFirst({
		where: (user, { eq }) => eq(user.username, username)
	});

	if (!userData)
		return err({
			_tag: 'UserNotFound',
			body: 'Nazwa użytkownika lub hasło jest nieprawidłowe.'
		});

	const validPassword = await verifyPassword(userData.passwordHash, password);

	if (!validPassword)
		return err({
			_tag: 'PasswordNotValid',
			body: 'Nazwa użytkownika lub hasło jest nieprawidłowe.'
		});

	const session = await createSession(userData.id);
	setSessionTokenCookie(event, session.id, session.expiresAt);
}
