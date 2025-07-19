import { episode, seriesRelation, seriesType_Enum, tagToSeries } from './index';
import { relations, sql } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const series = pgTable('series', {
	id: uuid().defaultRandom().primaryKey(),
	title: text().notNull(),
	type: seriesType_Enum().notNull(),
	coverUrl: text().notNull(),
	nsfw: boolean().notNull(),
	updateAt: timestamp()
		.$onUpdate(() => sql`now()`)
		.notNull(),

	// Optional
	// MAL
	malId: integer()
});
export const series_Relations = relations(series, ({ many }) => ({
	seriesRelation_s: many(seriesRelation, { relationName: 'referenceSeries' }),
	tag_s: many(tagToSeries),
	episode_s: many(episode)
}));
