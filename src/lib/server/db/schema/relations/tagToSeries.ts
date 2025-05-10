import { series, tag } from '../index';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, text, uuid } from 'drizzle-orm/pg-core';

export const tagToSeries = pgTable(
	'tag_to_series',
	{
		tagName: text()
			.references(() => tag.name, { onUpdate: 'cascade' })
			.notNull(),
		seriesId: uuid()
			.references(() => series.id, { onUpdate: 'cascade' })
			.notNull()
	},
	(t) => [primaryKey({ columns: [t.tagName, t.seriesId] })]
);
export const tagToSeriesRelations = relations(tagToSeries, ({ one }) => ({
	tag: one(tag, {
		fields: [tagToSeries.tagName],
		references: [tag.name]
	}),
	series: one(series, {
		fields: [tagToSeries.seriesId],
		references: [series.id]
	})
}));
