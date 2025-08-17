import { createUser } from '$lib/server/db/actions/user';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { type } from 'arktype';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const schema = type({
	email: 'string.email',
	login: 'string',
	password: 'string >= 8',
	confirmPassword: 'string >= 8'
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

export const load = (async () => {
	const form = await superValidate(arktype(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, url }) => {
		const form = await superValidate(request, arktype(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await createUser(
			{
				login: form.data.login,
				email: form.data.email,
				password: form.data.password
			},
			url
		).catch((e) => console.log(e));

		redirect(303, './register/success');
	}
} satisfies Actions;
