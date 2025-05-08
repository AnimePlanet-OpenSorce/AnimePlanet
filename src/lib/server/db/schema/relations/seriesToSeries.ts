import { group, series, user } from '../index';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, primaryKey, uuid } from 'drizzle-orm/pg-core';

export const relationTypeEnum = pgEnum('relationType', ['admin', 'mode']);

export const seriesToSeries = pgTable(
	'series_to_series',
	{
		baseSeriesId: uuid().references(() => series.id),
		referenceSeriesId: uuid().references(() => series.id),
		relationType: relationTypeEnum().notNull()
	},
	(t) => [primaryKey({ columns: [t.baseSeriesId, t.referenceSeriesId] })]
);
export const seriesToSeriesRelations = relations(seriesToSeries, ({ one }) => ({
	baseSeries: one(series, {
		fields: [seriesToSeries.baseSeriesId],
		references: [series.id]
	}),
	referenceSeries: one(series, {
		fields: [seriesToSeries.referenceSeriesId],
		references: [series.id]
	})
}));
