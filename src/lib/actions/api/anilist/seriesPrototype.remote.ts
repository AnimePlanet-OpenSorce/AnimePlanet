import { query } from '$app/server';
import { series } from '$lib/actions/series';
import { db } from '$lib/server/db';
import { seriesRelation, series as seriesTable } from '$lib/server/db/schema';
import { getAnimeData } from '$lib/utils/apis/anilist';
import { seriesRelationTypeEnum } from '$lib/utils/enums';
import { error } from '@sveltejs/kit';
import { type } from 'arktype';
import { createInsertSchema } from 'drizzle-arktype';

const props = type({
	malId: 'number'
});

const response = createInsertSchema(seriesTable).merge({
	relation_s: createInsertSchema(seriesRelation).pick('referenceSeriesId', 'relationType').array()
});

export const seriesPrototype = query(props, async ({ malId }) => {
	const data = await getAnimeData(malId);

	const relatedSeries = new Map(
		data?.relations?.edges
			?.map((v): [number, string] | undefined =>
				v?.node?.idMal && v.relationType ? [v.node.idMal, v.relationType.toLowerCase()] : undefined
			)
			.filter((v) => !!v)
	);

	const dbResponse = await db.query.series.findMany({
		columns: {
			id: true,
			malId: true
		},
		where: (t, { inArray }) => inArray(t.malId, relatedSeries.keys().toArray())
	});

	const relation_s = dbResponse
		.map((v) => {
			const relationType = (relatedSeries.get(v.malId as number) as string).toLowerCase();

			if (!seriesRelationTypeEnum.hasKey(relationType as any)) return;

			return { referenceSeriesId: v.id, relationType };
		})
		.filter((v) => !!v);

	console.log(dbResponse);

	const parsedData = {
		title: data?.title?.romaji,
		type: data?.format?.toLowerCase(),
		coverUrl: data?.coverImage?.large,
		bannerUrl: data?.bannerImage,
		nsfw: data?.isAdult,
		year:
			data?.startDate?.year &&
			data?.startDate?.month &&
			data?.startDate?.day &&
			new Date(data.startDate.year, data.startDate.month - 1, data.startDate.day),
		season: data?.season?.toLowerCase(),
		genre_s: data?.genres?.map((v) => v?.toLowerCase()),
		trailerUrl:
			data?.trailer?.site === 'youtube'
				? `https://www.youtube.com/watch?v=${data?.trailer?.id}`
				: null,
		malId,

		relation_s
	};

	const out = response(parsedData);

	if (out instanceof type.errors) {
		error(404, `Błąd anilist.search.\n ${out.summary}`);
	}

	return out;
});
