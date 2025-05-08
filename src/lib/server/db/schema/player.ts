import { source } from './index';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const player = pgTable('player', {
	id: uuid().defaultRandom().primaryKey(),
	sourceId: uuid().references(() => source.id),

	videoUrl: text().notNull(),
	audioUrl: text().notNull()
});
export const playerRelations = relations(player, ({ one }) => ({
	source: one(source, {
		fields: [player.sourceId],
		references: [source.id]
	})
}));

export const legacyPlayerTypeEnum = pgEnum('legacy_player_type', ['download', 'embed']);
export const legacyPlayer = pgTable('legacy_player', {
	id: uuid().defaultRandom().primaryKey(),
	sourceId: uuid().references(() => source.id),

	url: text().notNull(),
	type: legacyPlayerTypeEnum().notNull()
});
export const legacyPlayerRelations = relations(legacyPlayer, ({ one }) => ({
	source: one(source, {
		fields: [legacyPlayer.sourceId],
		references: [source.id]
	})
}));
