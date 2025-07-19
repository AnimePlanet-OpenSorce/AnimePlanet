import { legacyPlayerType_Enum, source } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const legacyPlayer = pgTable('legacy_player', {
	id: uuid().defaultRandom().primaryKey(),
	sourceId: uuid()
		.references(() => source.id, { onUpdate: 'cascade' })
		.notNull(),
	url: text().notNull(),
	type: legacyPlayerType_Enum().notNull()
});
export const legacyPlayer_Relations = relations(legacyPlayer, ({ one }) => ({
	source: one(source, {
		fields: [legacyPlayer.sourceId],
		references: [source.id]
	})
}));
