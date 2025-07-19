import { comment, session, userConfig, userGlobalRule, userToGroup, watchHistory } from './index';
import { relations, sql } from 'drizzle-orm';
import { pgTable, text, uuid, date, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: uuid().defaultRandom().primaryKey(),
	username: text().notNull().unique(),
	passwordHash: text().notNull(),
	age: date().notNull(),
	createAt: timestamp().defaultNow().notNull(),
	updateAt: timestamp()
		.$onUpdate(() => sql`now()`)
		.notNull()
});
export const user_Relations = relations(user, ({ many, one }) => ({
	userGlobalRule_s: many(userGlobalRule),
	userConfig: one(userConfig),

	session_s: many(session),

	comment_s: many(comment),

	userToGroup_s: many(userToGroup),

	watchHistory_s: many(watchHistory)
}));
