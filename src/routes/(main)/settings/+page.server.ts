import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
	redirect(302, '/settings/account');
}) satisfies PageServerLoad;
