import { form } from '$app/server';
import { errorsParse, type FormResult } from '$lib/actions/type';
import { db } from '$lib/server/db';
import { seriesToGroup } from '$lib/server/db/schema';
import { createInsertSchema } from 'drizzle-arktype';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const props = createInsertSchema(seriesToGroup);

export const seriesToGroupCreate = form(props, async (data) => {
	return await db.transaction(async (tx) => {
		const [createdRelation] = await tx
			.insert(seriesToGroup)
			.values(data)
			.returning()
			.onConflictDoNothing();

		if (!createdRelation) {
			tx.rollback();
		}
	});
});
