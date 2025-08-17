import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	redirect(303, './admin/series');
}) satisfies PageServerLoad;
