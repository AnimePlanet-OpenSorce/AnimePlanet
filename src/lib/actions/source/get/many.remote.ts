import { query } from '$app/server';
import { withPagination } from '$lib/actions/shared/manyResponse';
import { GetManyOptions, type GetManyResponse } from '$lib/actions/type';
import { db } from '$lib/server/db';
import { legacyPlayer, player, source } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { and, eq, getTableColumns } from 'drizzle-orm';

const sourceSchema = createSelectSchema(source);
const props = type({
	filters: type({
		'episodeId?': sourceSchema.get('episodeId')
	}).default(() => ({})),
	options: GetManyOptions
});

type DbResponse = typeof source.$inferSelect &
	(
		| {
				player: typeof player.$inferSelect;
				legacyPlayer?: null;
		  }
		| {
				player: null;
				legacyPlayer: typeof legacyPlayer.$inferSelect;
		  }
	);

export const sourceGetMany = query(
	props,
	async ({ filters, options }): GetManyResponse<DbResponse> => {
		const dbQuery = db
			.select({ ...getTableColumns(source), player, legacyPlayer })
			.from(source)
			.where(and(filters.episodeId ? eq(source.episodeId, filters.episodeId) : undefined))
			.leftJoin(player, eq(player.sourceId, source.id))
			.leftJoin(legacyPlayer, eq(legacyPlayer.sourceId, source.id))
			.$dynamic();

		return withPagination(dbQuery, options) as any;
	}
);
