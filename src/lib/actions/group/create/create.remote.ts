import { form } from '$app/server';
import { cleanObject } from '$lib/actions/shared';
import { db } from '$lib/server/db';
import { group, userToGroup as userToGroup_Table } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createInsertSchema, createSelectSchema } from 'drizzle-arktype';

const props = type({
	name: 'string',
	type: '"subtitles" | "lector"',
	'logoUrl?': 'string | undefined',
	'bannerUrl?': 'string | undefined',
	'description?': 'string',
	'userToGroup?': {
		'admin_s?': 'string[]'
	}
}).pipe.try(
	(v) => cleanObject(v),
	createInsertSchema(group).merge({
		'userToGroup?': {
			'admin_s?': createSelectSchema(userToGroup_Table).get('userId').array()
		}
	})
);

export const groupCreate = form(props, async ({ userToGroup, ...groupData }) => {
	return await db.transaction(async (tx) => {
		const [createdGroup] = await tx
			.insert(group)
			.values(groupData)
			.returning()
			.onConflictDoNothing();

		if (!createdGroup) tx.rollback();

		if (!!userToGroup?.admin_s) {
			const createdAdmin_s = await tx
				.insert(userToGroup_Table)
				.values(
					userToGroup.admin_s.map((v): typeof userToGroup_Table.$inferInsert => ({
						groupId: createdGroup.id,
						userId: v,
						role: 'admin'
					}))
				)
				.returning()
				.onConflictDoNothing();
			if (createdAdmin_s.length !== userToGroup.admin_s.length) tx.rollback();
		}
	});
});
