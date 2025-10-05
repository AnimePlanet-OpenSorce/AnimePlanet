import { query } from '$app/server';
import { withPagination } from '$lib/actions/shared/manyResponse';
import { GetManyOptions, type GetManyResponse } from '$lib/actions/type';
import { db, search } from '$lib/server/db';
import { series, seriesToGroup, tagToSeries } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import {
	and,
	arrayContains,
	asc,
	eq,
	getTableColumns,
	inArray,
	sql
} from 'drizzle-orm';

const seriesSchema = createSelectSchema(series);

const props = type({
	filters: type({
		'title?': 'string',

		'year?': 'string[]',
		'season?': ['string[]', '=>', seriesSchema.get('season').array()],
		'type?': ['string[]', '=>', seriesSchema.get('type').array()],
		'genre?': ['string[]', '=>', seriesSchema.get('genre_s')],
		'nsfw?': seriesSchema.get('nsfw'),

		'tag?': 'string[]',
		'group?': 'string[]',

		'malId?': 'number[]'
	}).default(() => ({})),
	options: GetManyOptions
});

export const seriesGetMany = query(
	props,
	async ({ filters, options }): GetManyResponse<typeof series.$inferSelect> => {
		const tagSubquery = db
			.select({
				seriesId: tagToSeries.seriesId,
				tags: sql<string[] | null>`array_agg(${tagToSeries.tagKey})`.as('tags')
			})
			.from(tagToSeries)
			.groupBy(tagToSeries.seriesId)
			.as('t');

		const groupSubquery = db
			.select({
				seriesId: seriesToGroup.seriesId,
				groups: sql<string[] | null>`array_agg(${seriesToGroup.groupId})`.as('groups')
			})
			.from(seriesToGroup)
			.groupBy(seriesToGroup.seriesId)
			.as('g');

		const dbQuery = db
			.select(getTableColumns(series))
			.from(series)
			.leftJoin(tagSubquery, eq(series.id, tagSubquery.seriesId))
			.leftJoin(groupSubquery, eq(series.id, groupSubquery.seriesId))
			.where(
				and(
					filters.title ? search(series.title, filters.title) : undefined,
					filters.year ? inArray(sql`extract(year from ${series.year})`, filters.year) : undefined,
					filters.season ? inArray(series.season, filters.season) : undefined,
					filters.type ? inArray(series.type, filters.type) : undefined,
					filters.genre ? arrayContains(series.genre_s, filters.genre) : undefined,
					filters.nsfw ? eq(series.nsfw, filters.nsfw) : undefined,

					filters.tag ? arrayContains(tagSubquery.tags, filters.tag) : undefined,
					filters.group
						? sql`${groupSubquery.groups} && ${sql.raw(`ARRAY[${filters.group.map((g) => `'${g}'`).join(', ')}]::uuid[]`)}`
						: undefined,

					filters.malId ? inArray(series.malId, filters.malId) : undefined
				)
			)
			.orderBy(
				filters.title ? sql`similarity(${series.title}, ${filters.title}) DESC` : asc(series.title)
			)
			.groupBy(series.id, tagSubquery.tags, groupSubquery.groups)
			.$dynamic();

		return await withPagination(dbQuery, options);
	}
);
