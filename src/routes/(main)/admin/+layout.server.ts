import { db } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ locals: { user } }) => {
	const isAdmin = await userIsAdmin(user?.id);

	if (!isAdmin) error(401, 'Przestrzeń tylko dla administracji.');
}) satisfies LayoutServerLoad;

const userIsAdmin = async (userId: unknown) => {
	if (typeof userId !== 'string') return false;

	const userRule = await db.query.userGlobalRule.findFirst({
		where: (t, { eq }) => eq(t.userId, userId)
	});

	if (userRule?.role !== 'admin' && userRule?.role !== 'root') return false;

	return true;
};
