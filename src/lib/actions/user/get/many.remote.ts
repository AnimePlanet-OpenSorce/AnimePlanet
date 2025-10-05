import { query } from '$app/server';
import { withPagination } from '$lib/actions/shared/manyResponse';
import { GetManyOptions } from '$lib/actions/type';
import { db, search } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { and } from 'drizzle-orm';

const userSchema = createSelectSchema(user);
const props = type({
	filters: type({
		'name?': userSchema.get('name')
	}).default(() => ({})),
	options: GetManyOptions
});

export const userGetMany = query(props, async ({ filters, options }) => {
	const dbQuery = db
		.select()
		.from(user)
		.where(and(filters.name ? search(user.name, filters.name) : undefined))
		.$dynamic();

	return withPagination(dbQuery, options);
});
