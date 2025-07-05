import { episode } from './episode';
import { tagToAnime } from './relations';
import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const anime = pgTable('anime', {
	id: uuid().defaultRandom().primaryKey(),
	title: text().unique().notNull(),
	releaseDate: timestamp().notNull(),
	coverImageUrl: text().notNull(),
	nsfw: boolean().default(false),
	malId: integer()
});

export const animeRelations = relations(anime, ({ many }) => ({
	episodes: many(episode),
	tags: many(tagToAnime)
}));

export type Anime = typeof anime.$inferSelect;
export type CreateAnime = typeof anime.$inferInsert;
