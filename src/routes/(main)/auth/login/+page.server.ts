import { login } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { type } from 'arktype';
import { message, superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const schema = type({
	login: 'string',
	password: 'string >= 8'
});

export const load = (async () => {
	const form = await superValidate(arktype(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async (event) => {
		const form = await superValidate(event.request, arktype(schema));

		if (!form.valid) return fail(400, { form });

		await login(
			{
				username: form.data.login,
				password: form.data.password
			},
			event
		);

		redirect(302, '/');
	}
} satisfies Actions;
