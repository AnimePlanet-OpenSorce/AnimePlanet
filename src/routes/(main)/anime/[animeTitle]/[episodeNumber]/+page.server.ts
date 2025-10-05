import { episode } from '$lib/actions/episode';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, parent }) => {
	const seriesId = (await parent()).series.id;

	const episodeData = await episode.get.one({
		filters: {
			number: params.episodeNumber,
			series: {
				id: seriesId
			}
		}
	});

	if (!episodeData) error(404, `Nie mamy odcinak "${params.episodeNumber}"`);

	if (!episodeData.malId) return { episode: episodeData };

	const prevEpisode = await episode.get.one({
		filters: {
			malId: episodeData.malId - 1,
			series: {
				id: seriesId
			}
		}
	});

	const nextEpisode = await episode.get.one({
		filters: {
			malId: episodeData.malId + 1,
			series: {
				id: seriesId
			}
		}
	});

	return { episode: episodeData, prevEpisode, nextEpisode };
}) satisfies PageServerLoad;
