import { db } from '$lib/server/db';
import { decodeUrl } from '$lib/utils/urlReadable';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const animeTitle = decodeUrl(params.title);
	const searchEpisodeNumber = Number(params.episodeNumber);

	const anime = await db.query.anime.findFirst({
		where: (anime, { eq }) => eq(anime.title, animeTitle),
		with: {
			episodes: {
				where: (episode, { eq, or }) =>
					or(
						eq(episode.episodeNumber, searchEpisodeNumber - 1),
						eq(episode.episodeNumber, searchEpisodeNumber),
						eq(episode.episodeNumber, searchEpisodeNumber + 1)
					),
				with: {
					downloads: true,
					videos: true
				}
			}
		}
	});

	const episodes = anime?.episodes;

	const episode = episodes?.find(({ episodeNumber }) => episodeNumber === searchEpisodeNumber);
	if (!episode) error(404, 'Nie można odnaleźć odcinka');

	return {
		anime,
		previousEpisode: !!episodes?.find(
			({ episodeNumber }) => episodeNumber === searchEpisodeNumber - 1
		),
		episode,
		nextEpisode: !!episodes?.find(({ episodeNumber }) => episodeNumber === searchEpisodeNumber + 1)
	};
}) satisfies PageServerLoad;
