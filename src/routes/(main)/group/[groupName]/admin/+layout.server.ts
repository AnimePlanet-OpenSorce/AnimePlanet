import { db } from '$lib/server/db';
import { decodeUrl } from '$lib/utils/url';
import type { LayoutServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	const userId = locals.user?.id;
	if (!userId) error(401, 'Brak dostępu.');

	const groupName = decodeUrl(params.groupName);

	const dbResponse = await db.query.group.findFirst({
		where: (t, { eq }) => eq(t.name, groupName),
		with: {
			userToGroup_s: {
				where: (t, { eq }) => eq(t.userId, userId)
			}
		}
	});
	if (!dbResponse) error(404, 'Grupa nie istnieje.');

	const { userToGroup_s, ...group } = dbResponse;

	if (userToGroup_s.length > 0) return { group };

	const userIsAdmin = await db.query.userGlobalRule.findFirst({
		where: (t, { and, eq, inArray }) =>
			and(eq(t.userId, userId), inArray(t.role, ['root', 'admin']))
	});

	if (userIsAdmin) return { group };

	error(401, 'Brak dostępu.');
}) satisfies LayoutServerLoad;

// const userIsGroupAdmin = async (
// 	groupName: string,
// 	userId: unknown
// ): Promise<{
// 	value: boolean;
// 	customError?: never;
// }> => {
// 	if (typeof userId !== 'string') return { value: false };

// 	const userIsAdmin = await db.query.userGlobalRule.findFirst({
// 		where: (t, { and, eq, inArray }) =>
// 			and(eq(t.userId, userId), inArray(t.role, ['root', 'admin']))
// 	});

// 	if (userIsAdmin) return { value: true };

// 	const group = await db.query.group.findFirst({
// 		where: (t, { eq }) => eq(t.name, groupName),
// 		columns: {},
// 		with: {
// 			userToGroup_s: {
// 				where: (t, { eq }) => eq(t.userId, userId)
// 			}
// 		}
// 	});

// 	if (!group)
// 		return { value: false, customError: error(404, `Grupa "${groupName}" nie istnieje.`) };

// 	if (group.userToGroup_s.length !== 1) return { value: false };

// 	return { value: true };
// };
