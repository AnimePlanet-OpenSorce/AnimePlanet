import { query } from '$app/server';
import { db, search } from '$lib/server/db';
import { series, seriesToGroup, tagToSeries } from '$lib/server/db/schema';
import { optionsSchema } from './shared';
import { type } from 'arktype';
import { and, asc, eq, getTableColumns, inArray, or, sql } from 'drizzle-orm';

const StringArray = type('string[]').default(() => []);

const getSeriesProps = type({
	filters: type({
		title: 'string = ""',
		tag: StringArray,
		year: StringArray,
		season: StringArray,
		type: StringArray,
		status: StringArray,
		group: StringArray
	}).default(() => ({})),
	options: optionsSchema
});

export type GetSeriesProps = typeof getSeriesProps.inferIn;

export const getSeries = query(getSeriesProps, async ({ filters, options }) => {
	const tagSubquery = db
		.select({
			seriesId: tagToSeries.seriesId,
			tags: sql<string[] | null>`array_agg(${tagToSeries.tagName})`.as('tags')
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

	const dbResponse = await db
		.select({ ...getTableColumns(series), tags: tagSubquery.tags, groups: groupSubquery.groups })
		.from(series)
		.leftJoin(tagSubquery, eq(series.id, tagSubquery.seriesId))
		.leftJoin(groupSubquery, eq(series.id, groupSubquery.seriesId))
		.where(
			and(
				filters.title.length > 0 ? search(series.title, filters.title) : undefined,
				filters.year.length > 0
					? inArray(sql`extract(year from ${series.year})`, filters.year)
					: undefined,
				filters.season.length > 0
					? inArray(series.season, filters.season as (typeof series.$inferSelect.season)[])
					: undefined,
				filters.type.length > 0
					? inArray(series.type, filters.type as (typeof series.$inferSelect.type)[])
					: undefined,
				filters.tag.length > 0
					? sql`${tagSubquery.tags} @> ${sql.raw(`ARRAY[${filters.tag.map((t) => `'${t}'`).join(', ')}]::text[]`)}`
					: undefined,
				filters.group.length > 0 ? sql`` : undefined
			)
		)
		.orderBy(
			filters.title.length > 0
				? sql`similarity(${series.title}, ${filters.title}) DESC`
				: asc(series.title)
		)
		.limit(options.perPage)
		.offset(options.perPage * options.page)
		.groupBy(series.id, tagSubquery.tags, groupSubquery.groups);

	return dbResponse;
});
