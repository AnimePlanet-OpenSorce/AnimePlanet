import { query } from '$app/server';
import { db } from '$lib/server/db';
import { type } from 'arktype';


const props = type({
	filters: type({
		'id?': 'string.uuid',
		'malId?': 'number',
		'title?': 'string'
	}).default(() => ({}))
});

export const seriesGetOne = query(props, async ({ filters }) => {
	const dbResponse = await db.query.series.findFirst({
		where: (t, { eq, and }) =>
			and(
				filters.id ? eq(t.id, filters.id) : undefined,
				filters.malId ? eq(t.malId, filters.malId) : undefined,
				filters.title ? eq(t.title, filters.title) : undefined
			)
	});

	return dbResponse
});
