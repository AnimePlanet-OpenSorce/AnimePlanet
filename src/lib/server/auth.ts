import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/public';
import { db } from './db';
import { sendEmail } from './emails';
import Welcome from './emails/templates/welcome.svelte';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';

export const auth = betterAuth({
	baseURL: env.PUBLIC_BETTER_AUTH_URL,
	plugins: [sveltekitCookies(getRequestEvent)],
	database: drizzleAdapter(db, {
		provider: 'pg'
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true
	},
	emailVerification: {
		sendOnSignUp: true,

		autoSignInAfterVerification: true,

		sendVerificationEmail: async ({ user, url }) => {
			await sendEmail({
				to: [user.email],
				subject: 'Verify your email address',
				template: Welcome,
				props: {
					userName: user.name,
					verificationLink: url
				}
			});
		}
	}
});

export type Session = typeof auth.$Infer.Session