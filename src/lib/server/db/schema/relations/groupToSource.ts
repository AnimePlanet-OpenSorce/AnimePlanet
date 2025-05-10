import { group, source } from '../index';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const groupToSource = pgTable(
	'group_to_source',
	{
		groupId: uuid()
			.references(() => group.id, { onUpdate: 'cascade' })
			.notNull(),
		sourceId: uuid()
			.references(() => source.id, { onUpdate: 'cascade' })
			.notNull()
	},
	(t) => [primaryKey({ columns: [t.groupId, t.sourceId] })]
);
export const groupToSourceRelations = relations(groupToSource, ({ one }) => ({
	source: one(source, {
		fields: [groupToSource.sourceId],
		references: [source.id]
	}),
	group: one(group, {
		fields: [groupToSource.groupId],
		references: [group.id]
	})
}));
