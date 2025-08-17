import { page } from '$app/state';
import { hashPassword } from '$lib/server/auth';
import { sendEmail, templates } from '$lib/server/emails/index';
import Welcome from '$lib/server/emails/templates/welcome.svelte';
import { db } from '..';
import { user } from '../schema';
import { and, eq } from 'drizzle-orm';
import { err, ok } from 'neverthrow';
import nodemailer from 'nodemailer';
import { render } from 'svelte/server';

type User = {
	login: string;
	email: string;
	password: string;
};

export const createUser = async (data: User, urlOrigin: URL) => {
	const passwordHash = await hashPassword(data.password);

	const [userData] = await db
		.insert(user)
		.values({
			username: data.login,
			email: data.email,
			passwordHash: passwordHash
		})
		.returning();

	sendEmail({
		to: [userData.email],
		subject: 'Weryfikacja konta',
		template: templates.Welcome,
		props: {
			verificationLink: `${urlOrigin.origin}/auth/register/verify/${userData.id}`,
			userName: userData.username
		}
	});
};

export const verifyUser = async (userId: string) => {
	const [userData] = await db
		.update(user)
		.set({
			verified: true
		})
		.where(eq(user.id, userId))
		.returning();

	if (!userData)
		return err({
			_tag: 'UserNotFound',
			body: 'Link weryfikacyjny jest nieprawidłowy.'
		});

	return ok(userData);
};
