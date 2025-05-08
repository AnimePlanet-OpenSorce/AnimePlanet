import { series, source } from './index';
import { relations } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const episodeTypeEnum = pgEnum('episode_type', [
	'episode',
	'ova',
	'ona',
	'special',
	'movie'
]);

export const episode = pgTable('episode', {
	id: uuid().defaultRandom().primaryKey(),
	seriesId: uuid().references(() => series.id),
	type: episodeTypeEnum(),

	// Optionals
	title: text(),
	number: integer(),
	description: text(),

	// Mal
	malId: integer()
});
export const episodeRelations = relations(episode, ({ one, many }) => ({
	series: one(series, {
		fields: [episode.seriesId],
		references: [series.id]
	}),
	source: many(source)
}));
