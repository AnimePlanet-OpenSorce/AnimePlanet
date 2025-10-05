import { form } from '$app/server';
import { cleanObject } from '$lib/actions/shared';
import { errorsParse, type FormResult } from '$lib/actions/type';
import { db } from '$lib/server/db';
import { episode } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema, createUpdateSchema } from 'drizzle-arktype';
import { eq } from 'drizzle-orm';
import { superValidate } from 'sveltekit-superforms';
import { arktype } from 'sveltekit-superforms/adapters';

const props = type({
	'number?': 'string',
	'title?': 'string',
	'duration?': type('string').pipe.try((str) => Number(str), type('number')),
	'description?': 'string',
	'coverUrl?': 'string',
	'malId?': type('string').pipe.try((str) => Number(str), type('number')),
	id: 'string'
}).pipe.try(
	(v) => cleanObject(v),
	type(
		createUpdateSchema(episode).omit('seriesId', 'id'),
		'&',
		createSelectSchema(episode).pick('id')
	)
);

export const episodeEditOne = form(props, async ({ id, ...episodeData }) => {
	const [dbResponse] = await db
		.update(episode)
		.set(episodeData)
		.where(eq(episode.id, id))
		.returning();

	return dbResponse;
});
