import { series } from '$lib/actions/series';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const seriesData = await series.get.one({
		filters: {
			id: params.seriesId
		}
	});

	if (!seriesData) error(404, 'Nie znaleziono serii.');

	return { series: seriesData };
}) satisfies LayoutServerLoad;
