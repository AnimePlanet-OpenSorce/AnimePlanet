import { user } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const session = pgTable('session', {
	id: uuid().defaultRandom().primaryKey(),
	userId: uuid()
		.references(() => user.id, { onUpdate: 'cascade' })
		.notNull(),
	expiresAt: timestamp()
		.$default(() => {
			const date = new Date();
			date.setDate(date.getDate() + 30);
			return date;
		})
		.notNull()
});

export const session_Relations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));
