import { group, series, seriesStatus_Enum } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const seriesToGroup = pgTable(
	'series_to_group',
	{
		seriesId: uuid()
			.references(() => series.id, { onUpdate: 'cascade' })
			.notNull(),
		groupId: uuid()
			.references(() => group.id, { onUpdate: 'cascade' })
			.notNull(),
		status: seriesStatus_Enum().notNull()
	},
	(t) => [primaryKey({ columns: [t.groupId, t.seriesId] })]
);
export const seriesToGroup_Relations = relations(seriesToGroup, ({ one }) => ({
	series: one(series, {
		fields: [seriesToGroup.seriesId],
		references: [series.id]
	}),
	group: one(group, {
		fields: [seriesToGroup.groupId],
		references: [group.id]
	})
}));
