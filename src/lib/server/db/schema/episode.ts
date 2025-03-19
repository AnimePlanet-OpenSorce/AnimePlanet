import { anime } from './anime';
import { relations } from 'drizzle-orm';
import { integer, pgTable, text, unique, uuid } from 'drizzle-orm/pg-core';

export const episode = pgTable(
	'episode',
	{
		id: uuid().defaultRandom().primaryKey(),
		animeId: uuid()
			.notNull()
			.references(() => anime.id, { onDelete: 'cascade' }),
		episodeNumber: integer().notNull(),
		title: text().notNull()
	},
	(t) => [unique().on(t.animeId, t.episodeNumber)]
);
export const episodeRelations = relations(episode, ({ one }) => ({
	anime: one(anime, { fields: [episode.animeId], references: [anime.id] })
	// videos: many(video),
	// downloads: many(download)
}));

export type Episode = typeof episode.$inferSelect;
export type CreateEpisode = typeof episode.$inferInsert;
