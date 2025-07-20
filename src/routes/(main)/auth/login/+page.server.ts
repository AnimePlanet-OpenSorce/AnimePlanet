import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
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
	default: async ({ request }) => {
		const form = await superValidate(request, arktype(schema));

		if (!form.valid) return fail(400, { form });

		console.log(form);

		return;
	}
} satisfies Actions;
