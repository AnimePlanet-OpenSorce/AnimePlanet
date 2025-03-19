import { session } from './session';
import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: uuid().defaultRandom().primaryKey(),
	age: timestamp(),
	email: text().unique().notNull(),
	login: text().unique().notNull(),
	passwordHash: text().notNull(),
	admin: boolean().default(false)
});
export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session)
}));

export type User = typeof user.$inferSelect;
export type CreateUser = typeof user.$inferInsert;
