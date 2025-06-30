import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { type } from 'arktype';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const schema = type({
	login: 'string',
	email: 'string.email',
	password: 'string >= 8',
	age: 'string.date.parse'
});

export const load = (async () => {
	const form = await superValidate(arktype(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, arktype(schema));
		console.log(form);

		if (!form.valid) return fail(400, { form });

		return;
	}
} satisfies Actions;
