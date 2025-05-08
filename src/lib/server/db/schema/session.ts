import { user } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const session = pgTable('session', {
	id: uuid().defaultRandom().primaryKey(),
	userId: uuid()
		.references(() => user.id)
		.notNull(),

	// Auto-gen
	expiresAt: timestamp({ withTimezone: true, mode: 'date' }).defaultNow()
});
export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));
