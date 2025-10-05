import { pgTable, text } from 'drizzle-orm/pg-core';

export const tag = pgTable('tag', {
	key: text().primaryKey(),
	value: text().notNull()
});
