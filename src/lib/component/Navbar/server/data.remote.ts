import { getRequestEvent, query } from '$app/server';
import { db } from '$lib/server/db';

export const getUser = query(async () => {
	const {
		locals: { user }
	} = getRequestEvent();

	if (!user) return;

	const userGlobalRule = await db.query.userGlobalRule.findFirst({
		where: (t, { eq }) => eq(t.userId, user.id)
	});

	return {
		username: user?.username,
		role: userGlobalRule?.role
	};
});
