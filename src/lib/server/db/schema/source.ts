import { episode, groupToSource } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const source = pgTable('source', {
	id: uuid().defaultRandom().primaryKey(),
	episodeId: uuid().references(() => episode.id)

	// TODO: Opis produkcji
});
export const sourceRelations = relations(source, ({ one, many }) => ({
	episode: one(episode, {
		fields: [source.episodeId],
		references: [episode.id]
	}),
	groupToSource: many(groupToSource)
}));
