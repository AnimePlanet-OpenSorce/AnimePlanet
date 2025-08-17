import { query } from '$app/server';
import { db } from '$lib/server/db';
import { group, user } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { sql } from 'drizzle-orm';

const groupSchema = createSelectSchema(group);

const getGroupsProps = type({
	filters: {
		name: groupSchema.get('name').default(''),
		type: groupSchema.get('type').default('all')
	}
});

export const getGroups = query(getGroupsProps, async ({ filters }) => {
	const groups = await db.query.group.findMany({
		where: (t, { and, eq, or, ilike }) =>
			and(
				filters.type.length > 0 ? eq(t.type, filters.type) : undefined,
				filters.name.length > 0
					? or(sql`${t.name} % ${filters.name}`, ilike(t.name, `%${filters.name}%`))
					: undefined
			),
		orderBy: (t, { asc }) => asc(t.name)
	});
	return groups;
});

const getUsersProps = type({
	options: type({
		perPage: 'number = 50',
		page: type('number')
			.pipe((n) => n - 1)
			.default(1)
	}).default(() => ({})),
	filters: {
		username: createSelectSchema(user).get('username')
	}
});

export const getUsers = query(getUsersProps, async ({ options, filters: { username } }) => {
	const users = await db.query.user.findMany({
		where: (t, { or, ilike }) =>
			username.length > 0
				? or(sql`${t.username} % ${username}`, ilike(t.username, `%${username}%`))
				: undefined,
		columns: {
			id: true,
			username: true
		}
	});

	return Object.fromEntries(users.map(({ id, username }) => [id, username]));
});
