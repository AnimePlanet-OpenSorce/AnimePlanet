import { episode } from '$lib/actions/episode';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
	const episodeData = await episode.get.one({
		filters: {
			id: params.episodeId
		}
	});

	if (!episodeData) error(404, 'Nie znaleziono serii.');

	return { episode: episodeData };
}) satisfies PageServerLoad;
