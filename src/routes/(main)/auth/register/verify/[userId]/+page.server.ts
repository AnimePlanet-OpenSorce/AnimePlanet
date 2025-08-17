import { verifyUser } from '$lib/server/db/actions/user';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { Effect } from 'effect';

export const load = (async ({ params }) => {
	const userData = await verifyUser(params.userId);

	if (userData.isErr())
		error(404, {
			message: userData.error.body
		});

	return { userId: userData.value.id };
}) satisfies PageServerLoad;
