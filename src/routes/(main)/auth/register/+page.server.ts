import { db } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';
import { schema } from './form-schema';
import { fail } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	const form = await superValidate(arktype(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, arktype(schema));

		if (!form.valid) return fail(400, { form });

		// Check if the username is unique
		const user = await db.query.user.findFirst({
			where: (user, { eq }) => eq(user.username, form.data.login),
			columns: {
				id: true
			}
		});

		if (user) {
			return setError(form, 'login', 'Username already taken');
		}

		console.log(form);

		return;
	}
} satisfies Actions;
