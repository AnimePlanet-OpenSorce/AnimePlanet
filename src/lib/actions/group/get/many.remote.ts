import { query } from '$app/server';
import { withPagination } from '$lib/actions/shared/manyResponse';
import { GetManyOptions, type GetManyResponse } from '$lib/actions/type';
import { db, search } from '$lib/server/db';
import { group, series, seriesToGroup } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { and, eq, getTableColumns, SQL } from 'drizzle-orm';

const groupSchema = createSelectSchema(group);

const props = type({
	filters: type({
		'name?': groupSchema.get('name'),
		'type?': groupSchema.get('type'),
		'id?': groupSchema.get('id')
	}).default(() => ({})),
	options: GetManyOptions
});

export const groupGetMany = query(
	props,
	async ({ filters, options }): GetManyResponse<typeof group.$inferSelect> => {
		const _where: (SQL | undefined)[] = [
			filters.name ? search(group.name, filters.name) : undefined,
			filters.type ? eq(group.type, filters.type) : undefined,
			filters.id ? eq(group.id, filters.id) : undefined
		];

		const dbQuery = db.select(getTableColumns(group)).from(group).$dynamic();

		return withPagination(dbQuery.where(and(..._where)), options);
	}
);
