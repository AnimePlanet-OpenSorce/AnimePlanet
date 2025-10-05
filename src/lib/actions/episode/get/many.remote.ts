import { query } from '$app/server';
import { withPagination } from '$lib/actions/shared/manyResponse';
import { GetManyOptions, type GetManyResponse } from '$lib/actions/type';
import { db } from '$lib/server/db';
import { episode } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { and, asc, eq, sql } from 'drizzle-orm';

const episodeSchema = createSelectSchema(episode);

const props = type({
	filters: type({
		'seriesId?': episodeSchema.get('seriesId')
	}).default(() => ({})),
	options: GetManyOptions
});

export const episodeGetMany = query(
	props,
	async ({ filters, options }): GetManyResponse<typeof episode.$inferSelect> => {
		const dbQuery = db
			.select()
			.from(episode)
			.where(and(filters.seriesId ? eq(episode.seriesId, filters.seriesId) : undefined))
			.orderBy(
				sql`(regexp_replace(${episode.number}, '\\D.*', ''))::int`,
				sql`regexp_replace(${episode.number}, '\\d+', '')`
			)
			.$dynamic();
		return await withPagination(dbQuery, options);
	}
);
