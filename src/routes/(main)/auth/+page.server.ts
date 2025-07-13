import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	redirect(300, '/auth/login');
	return {};
}) satisfies PageServerLoad;
