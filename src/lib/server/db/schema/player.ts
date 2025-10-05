import { source } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const player = pgTable('player', {
	id: uuid().defaultRandom().primaryKey(),
	sourceId: uuid()
		.references(() => source.id, { onUpdate: 'cascade' })
		.notNull(),
	torrentUrl: text().notNull(),

	// Optional
	audioUrl: text(),
	subtitlesUrl: text()
});
export const player_Relations = relations(player, ({ one }) => ({
	source: one(source, {
		fields: [player.sourceId],
		references: [source.id]
	})
}));
