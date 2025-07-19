import { series, seriesRelationType_Enum } from './index';
import { relations } from 'drizzle-orm';
import { pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const seriesRelation = pgTable(
	'series_relation',
	{
		baseSeriesId: uuid()
			.references(() => series.id, { onUpdate: 'cascade' })
			.notNull(),
		referenceSeriesId: uuid()
			.references(() => series.id, { onUpdate: 'cascade' })
			.notNull(),
		relationType: seriesRelationType_Enum().notNull()
	},
	(t) => [primaryKey({ columns: [t.baseSeriesId, t.referenceSeriesId] })]
);
export const seriesRelation_Relations = relations(seriesRelation, ({ one }) => ({
	baseSeries: one(series, {
		fields: [seriesRelation.baseSeriesId],
		references: [series.id],
		relationName: 'baseSeries'
	}),
	referenceSeries: one(series, {
		fields: [seriesRelation.referenceSeriesId],
		references: [series.id],
		relationName: 'referenceSeries'
	})
}));
