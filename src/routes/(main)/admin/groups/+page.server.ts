import { db } from '$lib/server/db';
import { group, user, userToGroup } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { type } from 'arktype';
import { createInsertSchema, createSelectSchema } from 'drizzle-arktype';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const groupSchema = createInsertSchema(group);

const schema = type({
	name: groupSchema.get('name'),
	type: groupSchema.get('type'),
	admin_s: type(createSelectSchema(user).get('id'), '[]').default(() => [])
});

export const load = (async () => {
	const form = await superValidate(arktype(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions = {
	createGroup: async ({ request }) => {
		const form = await superValidate(request, arktype(schema));

		if (!form.valid) return fail(400, { form });

		const t = db.transaction(async (tx) => {
			const [groupData] = await tx
				.insert(group)
				.values({
					name: form.data.name,
					type: form.data.type
				})
				.returning();

			const admin_s = form.data.admin_s.map(
				(adminId) =>
					({
						role: 'admin',
						groupId: groupData.id,
						userId: adminId
					}) satisfies typeof userToGroup.$inferInsert
			);

			if (admin_s.length > 0) await tx.insert(userToGroup).values(admin_s);
		});

		console.log(t);
	}
} satisfies Actions;
