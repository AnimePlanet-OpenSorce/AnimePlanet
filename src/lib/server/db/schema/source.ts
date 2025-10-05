import { episode, groupToSource, legacyPlayer, watchHistory } from './index';
import { player } from './player';
import { relations } from 'drizzle-orm';
import { pgTable, uuid } from 'drizzle-orm/pg-core';

export const source = pgTable('source', {
	id: uuid().defaultRandom().primaryKey(),
	episodeId: uuid()
		.references(() => episode.id)
		.notNull()
});
export const source_Relations = relations(source, ({ one, many }) => ({
	episode: one(episode, {
		fields: [source.episodeId],
		references: [episode.id]
	}),

	groupToSource_s: many(groupToSource),

	watchHistory_s: many(watchHistory),

	player_s: many(player),
	legacyPlayer_s: many(legacyPlayer)
}));
