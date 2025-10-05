import { form, query } from '$app/server';
import { db } from '$lib/server/db';
import { tag } from '$lib/server/db/schema';
import { type } from 'arktype';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const rmTagForm = type({
	key: 'string > 0'
});

export const rmTag = form(rmTagForm, async (data) => {
	await db.delete(tag).where(eq(tag.key, data.key));
});

const editTagForm = type({
	key: 'string > 0',
	value: 'string > 0'
});

export const editTag = form(editTagForm, async (data) => {
	await db
		.update(tag)
		.set({
			value: data.value
		})
		.where(eq(tag.key, data.key));
});

const createTagForm = type({
	key: 'string > 0',
	value: 'string > 0'
});

export const createTag = form(createTagForm, async (data) => {
	await db
		.insert(tag)
		.values({
			key: data.key,
			value: data.value
		})
		.onConflictDoNothing()
		.returning();
});
