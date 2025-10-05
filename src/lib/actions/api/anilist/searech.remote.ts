import { query } from '$app/server';
import { series } from '$lib/server/db/schema';
import { searchAnime } from '$lib/utils/apis/anilist';
import { error } from '@sveltejs/kit';
import { type } from 'arktype';
import { createInsertSchema } from 'drizzle-arktype';

const seriesSchema = createInsertSchema(series);

const props = type({
	title: 'string'
});

const response = type(
	{
		malId: 'number',
		title: 'string'
	},
	'[]'
);

export const search = query(props, async ({ title }): Promise<typeof response.infer> => {
	const data = (await searchAnime(title))?.data?.Page?.media;

	const parsedData = data
		?.map((v) => {
			return {
				malId: v?.idMal ?? null,
				title: v?.title?.romaji ?? v?.title?.english ?? null
			};
		})
		.filter((v) => v.malId && v.title);

	const out = response(parsedData);

	if (out instanceof type.errors) {
		error(404, `Błąd anilist.search.\n ${out.summary}`);
	}

	return out;
});
