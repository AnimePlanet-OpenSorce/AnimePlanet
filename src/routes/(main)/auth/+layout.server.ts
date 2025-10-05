import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	if (locals.user) redirect(303, '/');

	return {};
}) satisfies LayoutServerLoad;
