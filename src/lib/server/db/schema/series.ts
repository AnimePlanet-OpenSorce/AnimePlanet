import { episode, tagToSeries } from './index';
import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const series = pgTable('series', {
	id: uuid().defaultRandom().primaryKey(),
	title: text().notNull(),
	coverUrl: text().notNull(),

	// Optionals
	nsfw: boolean().default(false),

	// Auto-gen
	last_touch: timestamp({ mode: 'date' }).$onUpdate(() => new Date())
});
export const seriesRelations = relations(series, ({ many }) => ({
	tagToSeries: many(tagToSeries),
	episode: many(episode)
}));
