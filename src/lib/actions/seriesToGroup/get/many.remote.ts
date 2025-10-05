import { query } from '$app/server';
import { withPagination } from '$lib/actions/shared/manyResponse';
import { GetManyOptions, type GetManyResponse } from '$lib/actions/type';
import { db } from '$lib/server/db';
import { seriesToGroup } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { and, eq, getTableColumns, SQL } from 'drizzle-orm';

const seriesToGroupSchema = createSelectSchema(seriesToGroup);

const props = type({
	filters: type({
		'seriesId?': seriesToGroupSchema.get('seriesId'),
		'groupId?': seriesToGroupSchema.get('groupId'),
		'status?': seriesToGroupSchema.get('status')
	}).default(() => ({})),
	options: GetManyOptions
});

export const seriesToGroupGetMany = query(
	props,
	async ({ filters, options }): GetManyResponse<typeof seriesToGroup.$inferSelect> => {
		const dbQuery = db
			.select(getTableColumns(seriesToGroup))
			.from(seriesToGroup)
			.where(
				and(
					filters.seriesId ? eq(seriesToGroup.seriesId, filters.seriesId) : undefined,
					filters.groupId ? eq(seriesToGroup.groupId, filters.groupId) : undefined,
					filters.status ? eq(seriesToGroup.status, filters.status) : undefined
				)
			)
			.$dynamic();

		return withPagination(dbQuery, options);
	}
);
