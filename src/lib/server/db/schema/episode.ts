import { comment, series, source } from './index';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const episode = pgTable('episode', {
	id: uuid().defaultRandom().primaryKey(),
	seriesId: uuid()
		.references(() => series.id, { onUpdate: 'cascade' })
		.notNull(),

	number: text().notNull(),
	title: text().notNull(),

	duration: integer().notNull(), // As a minutes
	
	// Optional
	description: text(),
	coverUrl: text(),

	// MAL
	malId: integer()
});
export const episode_Relations = relations(episode, ({ one, many }) => ({
	series: one(series, {
		fields: [episode.seriesId],
		references: [series.id]
	}),

	comment_s: many(comment),

	source_s: many(source)
}));
