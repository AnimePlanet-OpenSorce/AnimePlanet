import { group, user, userRole_Enum } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const userToGroup = pgTable(
	'user_to_group',
	{
		userId: uuid().references(() => user.id, { onUpdate: 'cascade' }).notNull(),
		groupId: uuid().references(() => group.id, { onUpdate: 'cascade' }).notNull(),
		role: userRole_Enum().notNull()
	},
	(t) => [primaryKey({ columns: [t.userId, t.groupId] })]
);
export const userToGroup_Relations = relations(userToGroup, ({ one }) => ({
	user: one(user, {
		fields: [userToGroup.userId],
		references: [user.id]
	}),
	group: one(group, {
		fields: [userToGroup.groupId],
		references: [group.id]
	})
}));
