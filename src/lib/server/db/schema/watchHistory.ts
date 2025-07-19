import { source, user } from './index';
import { relations } from 'drizzle-orm';
import { numeric, pgTable, smallint, uuid } from 'drizzle-orm/pg-core';

export const watchHistory = pgTable('watch_history', {
	userId: uuid()
		.references(() => user.id, { onUpdate: 'cascade' })
		.notNull(),
	sourceId: uuid()
		.references(() => source.id, { onUpdate: 'cascade' })
		.notNull(),

	/** */
	watchTime: numeric({ precision: 5, scale: 2 }).notNull()
});
export const watchHistory_Relations = relations(watchHistory, ({ one }) => ({
	user: one(user, {
		fields: [watchHistory.userId],
		references: [user.id]
	}),
	source: one(source, {
		fields: [watchHistory.sourceId],
		references: [source.id]
	})
}));
