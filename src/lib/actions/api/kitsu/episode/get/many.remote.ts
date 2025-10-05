import { query } from '$app/server';
import { kitsuParser } from '../../types';
import { type } from 'arktype';

const props = type({
	seriesMalId: 'number'
});

export const kitsuGetEpisodeMany = query(props, async ({ seriesMalId }) => {
	const kitsuData = kitsuParser.mapping(
		await (
			await fetch(
				`https://kitsu.io/api/edge/mappings?filter[externalSite]=myanimelist%2Fanime&filter[externalId]=${seriesMalId}&include=item`
			)
		).json()
	);

	if (kitsuData instanceof type.errors) {
		console.error('Mapping:', kitsuData.summary);
		return [];
	}

	let response: typeof kitsuParser.episode.infer.data = [];
	let page: string = `https://kitsu.io/api/edge/anime/${kitsuData.included[0].id}/episodes?page[limit]=20`;

	while (page.length > 0) {
		const episode_s = kitsuParser.episode(await (await fetch(page)).json());

		if (episode_s instanceof type.errors) {
			console.error(episode_s.summary);
			return [];
		}

		response.push(...episode_s.data);
		page = episode_s.links.next ?? '';
	}

	return response;
});
