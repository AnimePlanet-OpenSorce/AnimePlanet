import { episode } from './episode';
import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

///////////
// Video //
///////////
export const video = pgTable('video', {
	id: uuid().defaultRandom().primaryKey(),
	episodeId: uuid()
		.notNull()
		.references(() => episode.id, { onDelete: 'cascade' }),
	url: text().notNull()
});
export const videoRelations = relations(video, ({ one }) => ({
	episode: one(episode, { fields: [video.episodeId], references: [episode.id] })
}));

export type Video = typeof video.$inferSelect;
export type CreateVideo = typeof video.$inferInsert;

//////////////
// Download //
//////////////
export const download = pgTable('download', {
	id: uuid().defaultRandom().primaryKey(),
	episodeId: uuid()
		.notNull()
		.references(() => episode.id, { onDelete: 'cascade' }),
	url: text().notNull()
});
export const downloadRelations = relations(download, ({ one }) => ({
	episode: one(episode, { fields: [download.episodeId], references: [episode.id] })
}));

export type Download = typeof download.$inferSelect;
export type CreateDownload = typeof download.$inferInsert;
