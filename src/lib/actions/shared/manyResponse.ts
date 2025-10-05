import { db } from '$lib/server/db';
import type { GetManyOptions, GetManyResponse } from '../type';
import type { PgSelect } from 'drizzle-orm/pg-core';

export const withPagination = async <
	T extends PgSelect,
	O extends (typeof GetManyOptions)[0]['infer']
>(
	qb: T,
	options: O
): GetManyResponse<Awaited<T>[number]> => {
	if (options.perPage === 'all') {
		return {
			data: await qb,
			pagination: {
				lastVisiblePage: 0,
				hasNextPage: false
			}
		};
	} else {
		const count = await db.$count(qb);

		const dbResponse = await qb.limit(options.perPage).offset(options.perPage * options.page);

		let lastVisiblePage = Math.ceil(count / options.perPage) - 1;

		lastVisiblePage = lastVisiblePage === -1 ? 0 : lastVisiblePage;

		return {
			data: dbResponse,
			pagination: {
				lastVisiblePage: lastVisiblePage,
				hasNextPage: options.page < lastVisiblePage
			}
		};
	}
};
