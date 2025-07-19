import { pgTable, text } from 'drizzle-orm/pg-core';

export const tag = pgTable('tag', {
	name: text().primaryKey()
});
