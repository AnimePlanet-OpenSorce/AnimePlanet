import { query } from '$app/server';
import { withPagination } from '$lib/actions/shared/manyResponse';
import { GetManyOptions, type GetManyResponse } from '$lib/actions/type';
import { db } from '$lib/server/db';
import { series, seriesRelation } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { and, eq, getTableColumns } from 'drizzle-orm';

const seriesRelationSchema = createSelectSchema(seriesRelation);

const props = type({
	filters: type({
		'baseSeriesId?': seriesRelationSchema.get('baseSeriesId')
	}).default(() => ({})),
	options: GetManyOptions
});

type DbResponse = typeof seriesRelation.$inferSelect & {
	referenceSeries: typeof series.$inferSelect;
};

export const seriesRelationGetMany = query(
	props,
	async ({ filters, options }): GetManyResponse<DbResponse> => {
		console.log(filters);

		const dbQuery = db
			.select({
				...getTableColumns(seriesRelation),
				referenceSeries: series
			})
			.from(seriesRelation)
			.where(
				and(
					filters.baseSeriesId ? eq(seriesRelation.baseSeriesId, filters.baseSeriesId) : undefined
				)
			)
			.innerJoin(series, eq(seriesRelation.referenceSeriesId, series.id))
			.$dynamic();

		return withPagination(dbQuery, options);
	}
);
