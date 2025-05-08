import { tagToSeries } from './relations';
import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const tag = pgTable('tag', {
	name: text().primaryKey()
});
export const tagRelations = relations(tag, ({ many }) => ({
	tagToSeries: many(tagToSeries)
}));
