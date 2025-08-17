import { groupToSource, groupType_Enum, seriesToGroup, userToGroup } from './index';
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
	groupToSource_s: many(groupToSource),
	userToGroup_s: many(userToGroup),
	seriesToGroup_s: many(seriesToGroup)
}));
