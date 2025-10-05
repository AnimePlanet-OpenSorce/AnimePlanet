import { form, getRequestEvent, query } from '$app/server';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { errorsParse, type FormResult } from './type';
import { redirect } from '@sveltejs/kit';
import { type } from 'arktype';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const singUpForm = type({
	email: 'string.email',
	name: 'string > 0',
	password: 'string >= 8',
	confirmPassword: type('string >= 8')
}).narrow((data, ctx) => {
	if (data.password === data.confirmPassword) {
		return true;
	}
	return ctx.reject({
		expected: 'identical to password',
		actual: '',
		path: ['confirmPassword']
	});
});

export const singUp = form(singUpForm, async (data) => {
	await auth.api.signUpEmail({
		body: {
			email: data.email,
			name: data.name,
			password: data.password
		}
	});

	redirect(302, '/auth/register/success');
});

const singInProps = type({
	email: 'string.email',
	password: 'string >= 8',
	rememberMe: type('string')
		.pipe((s, ctx) => {
			switch (s) {
				case 'true':
					return true;
				case 'false':
					return false;
			}
		})
		.default('true')
});

export const singIn = form(singInProps, async ({ email, password, rememberMe }): FormResult => {
	try {
		await auth.api.signInEmail({
			body: {
				email: email,
				password: password,
				rememberMe: rememberMe,
				callbackURL: '/'
			}
		});
	} catch (e) {
		console.error(e);

		// return {
		// 	errors: {
		// 		global: [JSON.stringify(e)]
		// 	}
		// };
	}

	redirect(302, '/');
});

export const singOut = form(async () => {
	try {
		await auth.api.signOut({
			headers: getRequestEvent().request.headers
		});
	} catch (e) {
		console.error(e);
	}
});

export const getUser = query(async () => {
	const {
		locals: { user }
	} = getRequestEvent();

	if (!user) return;

	const userGlobalRule = await db.query.userGlobalRule.findFirst({
		where: (t, { eq }) => eq(t.userId, user.id)
	});

	return {
		user: {
			name: user.name
		},
		role: userGlobalRule?.role
	};
});
