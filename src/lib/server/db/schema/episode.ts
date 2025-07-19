import { comment, series, source } from './index';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const episode = pgTable('episode', {
	id: uuid().defaultRandom().primaryKey(),
	series_id: uuid()
		.references(() => series.id, { onUpdate: 'cascade' })
		.notNull(),
	number: text().notNull(),

	// Optional
	title: text(),
	description: text(),

	// MAL
	mal_id: integer()
});
export const episode_Relations = relations(episode, ({ one, many }) => ({
	series: one(series, {
		fields: [episode.series_id],
		references: [series.id]
	}),

	comment_s: many(comment),

	source_s: many(source)
}));
