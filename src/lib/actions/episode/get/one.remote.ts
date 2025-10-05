import { query } from '$app/server';
import { db } from '$lib/server/db';
import { episode, groupToSource, series, source } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { and, eq, getTableColumns, not, SQL } from 'drizzle-orm';

const episodeSchema = createSelectSchema(episode);
const props = type({
	filters: type({
		'id?': episodeSchema.get('id'),
		'malId?': episodeSchema.get('malId'),
		'number?': episodeSchema.get('number'),
		'source?': {
			'groupId?': createSelectSchema(groupToSource).get('groupId')
		},
		'series?': {
			'id?': createSelectSchema(series).get('id')
		}
	}).default(() => ({}))
});

export const episodeGetOne = query(
	props,
	async ({ filters }): Promise<typeof episode.$inferSelect | undefined> => {
		const _where: (SQL | undefined)[] = [
			filters.id ? eq(episode.id, filters.id) : undefined,
			typeof filters.malId === 'number' ? eq(episode.malId, filters.malId) : undefined,
			filters.number ? eq(episode.number, filters.number) : undefined
		];

		const dbQuery = db
			.select({
				...getTableColumns(episode)
			})
			.from(episode)
			.limit(1)
			.$dynamic();

		if (filters.source?.groupId) {
			_where.push(
				filters.source.groupId ? eq(groupToSource.groupId, filters.source.groupId) : undefined
			);
			dbQuery
				.innerJoin(source, eq(source.episodeId, source.id))
				.innerJoin(groupToSource, eq(groupToSource.sourceId, source.id));
		}

		if (filters.series?.id) {
			_where.push(filters.series.id ? eq(series.id, episode.seriesId) : undefined);
			dbQuery.innerJoin(series, eq(series.id, filters.series.id));
		}

		let [dbResponse] = await dbQuery.where(and(..._where));
		return dbResponse;
	}
);
