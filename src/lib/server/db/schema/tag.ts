import { tagToAnime } from './relations';
import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const tag = pgTable('tag', {
	name: text().primaryKey()
});
export const tagRelations = relations(tag, ({ many }) => ({
	anime: many(tagToAnime)
}));

export type Tag = typeof tag.$inferSelect;
export type CreateTag = typeof tag.$inferInsert;
