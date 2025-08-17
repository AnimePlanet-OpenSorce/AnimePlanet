import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/demo/lucia/login');
	}

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);

		return redirect(302, '/');
	}
};
