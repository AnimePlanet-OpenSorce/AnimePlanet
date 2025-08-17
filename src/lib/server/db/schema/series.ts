import {
	episode,
	seriesRelation,
	seriesSeason_Enum,
	seriesToGroup,
	seriesType_Enum,
	tagToSeries
} from './index';
import { relations, sql } from 'drizzle-orm';
import { boolean, date, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const series = pgTable('series', {
	id: uuid().defaultRandom().primaryKey(),
	title: text().notNull(),
	type: seriesType_Enum().notNull(),
	coverUrl: text().notNull(),
	nsfw: boolean().notNull(),
	updateAt: timestamp()
		.$onUpdate(() => sql`now()`)
		.notNull(),

	year: date({ mode: 'date' }).notNull(),
	season: seriesSeason_Enum().notNull(),

	// Optional
	trailerUrl: text(),

	// MAL
	malId: integer()
});
export const series_Relations = relations(series, ({ many }) => ({
	seriesRelation_s: many(seriesRelation, { relationName: 'referenceSeries' }),
	tag_s: many(tagToSeries),
	episode_s: many(episode),
	seriesToGroup_s: many(seriesToGroup)
}));
