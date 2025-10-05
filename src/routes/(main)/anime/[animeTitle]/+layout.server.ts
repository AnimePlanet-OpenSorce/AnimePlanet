import { series } from '$lib/actions/series';
import { decodeUrl } from '$lib/utils/url';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const animeTitle = decodeUrl(params.animeTitle);

	const seriesData = await series.get.one({
		filters: {
			title: animeTitle
		}
	});

	if (!seriesData) error(404, `Nie mamy serii o nazwie "${animeTitle}"`);

	return { series: seriesData };
}) satisfies LayoutServerLoad;
