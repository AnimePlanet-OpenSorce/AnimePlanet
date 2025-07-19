import { groupType_Enum, userToGroup } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const group = pgTable('group', {
	id: uuid().defaultRandom().primaryKey(),
	name: text().notNull(),
	type: groupType_Enum().notNull(),

	// Optional
	logoUrl: text(),
	bannerUrl: text(),
	description: text()
});
export const group_Relations = relations(group, ({ many }) => ({
	userToGroup_s: many(userToGroup)
}));
