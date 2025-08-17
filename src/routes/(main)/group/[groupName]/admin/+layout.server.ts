import { db } from '$lib/server/db';
import { decodeUrl } from '$lib/utils/url';
import type { LayoutServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	const groupName = decodeUrl(params.groupName);

	const isGroupAdmin = await userIsGroupAdmin(groupName, locals.user?.id);

	const group = await db.query.group.findFirst({
		where: (t, { eq }) => eq(t.name, groupName),
		columns: {},
		with: {
			userToGroup_s: {
				where: (t, { eq }) => eq(t.userId, locals.user?.id as string)
			}
		}
	});
	if (!group) return error(404, 'Grupa nie istnieje.');

	if (isGroupAdmin.value === false)
		return isGroupAdmin.customError ?? error(401, `Tylko dla administracji grupy: "${groupName}"`);

	return {
		group: await db.query.group.findFirst({
			where: (t, { eq }) => eq(t.name, groupName)
		})
	};
}) satisfies LayoutServerLoad;

const userIsGroupAdmin = async (
	groupName: string,
	userId: unknown
): Promise<{
	value: boolean;
	customError?: never;
}> => {
	if (typeof userId !== 'string') return { value: false };

	const group = await db.query.group.findFirst({
		where: (t, { eq }) => eq(t.name, groupName),
		columns: {},
		with: {
			userToGroup_s: {
				where: (t, { eq }) => eq(t.userId, userId)
			}
		}
	});

	if (!group)
		return { value: false, customError: error(404, `Grupa "${groupName}" nie istnieje.`) };

	if (group.userToGroup_s.length !== 1) return { value: false };

	return { value: true };
};
