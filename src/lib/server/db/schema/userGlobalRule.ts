import { user, userRole_Enum } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const userGlobalRule = pgTable('user_global_rule', {
	userId: text()
		.primaryKey()
		.references(() => user.id, { onUpdate: 'cascade' }),
	role: userRole_Enum().notNull()
});

export const userGlobalRule_Relations = relations(userGlobalRule, ({ one }) => ({
	user: one(user, {
		fields: [userGlobalRule.userId],
		references: [user.id]
	})
}));
