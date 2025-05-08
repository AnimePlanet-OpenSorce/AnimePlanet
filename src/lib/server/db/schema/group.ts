import { userToGroup } from './relations';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const groupTypeEnum = pgEnum('group_type', ['subtitles', 'voiceover']);

export const group = pgTable('group', {
	id: uuid().defaultRandom().primaryKey(),
	groupName: text().notNull().unique(),
	type: groupTypeEnum().notNull(),

	// Optionals
	logoUrl: text(),
	description: text()
});
export const groupRelations = relations(group, ({ many }) => ({
	userToGroup: many(userToGroup)
}));
