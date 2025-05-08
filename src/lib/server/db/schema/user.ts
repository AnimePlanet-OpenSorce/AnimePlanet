import { userToGroup, session } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, date, pgEnum } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('user_role', ['root', 'admin', 'moderator']);

export const user = pgTable('user', {
	id: uuid().defaultRandom().primaryKey(),
	username: text().notNull().unique(),
	passwordHash: text().notNull(),

	// Optionals
	age: date(),
	role: roleEnum()
});
export const userRelations = relations(user, ({ many }) => ({
	session: many(session),
	userToGroup: many(userToGroup)
}));
