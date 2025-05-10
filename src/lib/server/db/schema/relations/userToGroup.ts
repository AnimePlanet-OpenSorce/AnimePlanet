import { group, user } from '../index';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uuid } from 'drizzle-orm/pg-core';

export const roleInGroupEnum = pgEnum('role_in_group', ['admin', 'mode']);

export const userToGroup = pgTable('user_to_group', {
	id: uuid().defaultRandom().primaryKey(),
	userId: uuid()
		.references(() => user.id, { onUpdate: 'cascade' })
		.notNull(),
	groupId: uuid()
		.references(() => group.id, { onUpdate: 'cascade' })
		.notNull(),
	role: roleInGroupEnum().notNull()
});
export const userToGroupRelations = relations(userToGroup, ({ one }) => ({
	user: one(user, {
		fields: [userToGroup.userId],
		references: [user.id]
	}),
	group: one(group, {
		fields: [userToGroup.groupId],
		references: [group.id]
	})
}));
