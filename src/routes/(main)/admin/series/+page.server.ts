import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { type } from 'arktype';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const schema = type({
	malId: type('string.integer.parse[]').pipe.try(([n]) => {
		return n;
	}, type('number'))
});

export const load = (async () => {
	const form = await superValidate(arktype(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	createSeries: async ({ request }) => {
		const form = await superValidate(request, arktype(schema));
		
		if (!form.valid) {
			return fail(400, { form });
		}

		console.log(form);
	}
} satisfies Actions;
