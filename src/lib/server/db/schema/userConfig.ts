import { content_Enum, user } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const userConfig = pgTable('user_config', {
	userId: text()
		.primaryKey()
		.references(() => user.id, { onUpdate: 'cascade' })
		.notNull(),
	content_scope: content_Enum().notNull()
});

export const userConfig_Relations = relations(userConfig, ({ one }) => ({
	user: one(user, {
		fields: [userConfig.userId],
		references: [user.id]
	})
}));
