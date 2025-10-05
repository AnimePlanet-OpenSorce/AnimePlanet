import { form } from '$app/server';
import { cleanObject } from '$lib/actions/shared';
import { db } from '$lib/server/db';
import { series, seriesRelation } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createInsertSchema } from 'drizzle-arktype';

const seriesSchema = createInsertSchema(series);
const seriesRelationSchema = createInsertSchema(seriesRelation);

const props = type({
	title: 'string',
	type: 'string',
	coverUrl: 'string',
	bannerUrl: 'string',
	nsfw: [
		'string',
		'=>',
		(str, ctx) => {
			switch (str) {
				case 'true':
					return true;
				case 'false':
					return false;
				default:
					return ctx.mustBe('"true" | "false"');
			}
		}
	],
	year: 'string.date.parse',
	season: 'string',
	genre_s: 'string[]',
	malId: ['string', '=>', (str) => Number(str)],
	'trailerUrl?': 'string',
	'description?': 'string',
	'relation_s?': type(
		{
			referenceSeriesId: 'string',
			relationType: 'string'
		},
		'[]'
	)
}).pipe.try(
	(v) => cleanObject(v),
	seriesSchema.merge({
		relation_s: type(seriesRelationSchema.pick('referenceSeriesId', 'relationType'), '[]').default(
			() => []
		)
	})
);

export type Props = typeof props.infer;

export const seriesCreate = form(props, async ({ relation_s, ...seriesData }) => {
	return await db.transaction(async (tx) => {
		const [createdSeries] = await tx
			.insert(series)
			.values(seriesData)
			.returning()
			.onConflictDoNothing();


		if (!createdSeries) {
			tx.rollback();
		}

		if (relation_s.length > 0) {
			const [createdRelations] = await tx
				.insert(seriesRelation)
				.values(
					relation_s.map((v): typeof seriesRelation.$inferInsert => ({
						...v,
						baseSeriesId: createdSeries.id
					}))
				)
				.returning()
				.onConflictDoNothing();

			if (!createdRelations) {
				tx.rollback();
			}
		}
	});
});
