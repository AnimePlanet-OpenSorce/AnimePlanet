import { type } from 'arktype';

export const getAnimeEpisodesSchema = type({
	pagination: {
		last_visible_page: 'number',
		has_next_page: 'boolean'
	},
	data: type({
		mal_id: 'number',
		url: 'string | null',
		title: 'string',
		title_japanese: 'string',
		title_romanji: 'string',
		aired: 'string', // można też: "date" jeśli chcesz parsować
		score: 'number | null',
		filler: 'boolean',
		recap: 'boolean',
		forum_url: 'string | null'
	}).array()
});

export const getAnimeEpisodesPage = async (malId: number, page: number) => {
	const response = await (
		await fetch(`https://api.jikan.moe/v4/anime/${malId}/episodes?page=${page}`)
	).json();

	const data = getAnimeEpisodesSchema(response);

	if (data instanceof type.errors) {
		throw new Error(data.summary);
	}

	return data;
};

export const getAnimeEpisodes = async (malId: number) => {
	let response: typeof getAnimeEpisodesSchema.inferOut.data = [];
	let nextPage = true;
	let n = 1;

	while (nextPage) {
		if (n > 1) {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}

		let _response = await getAnimeEpisodesPage(malId, n);

		if (!_response) {
			await new Promise((resolve) => setTimeout(resolve, 5000));

			_response = await getAnimeEpisodesPage(malId, n);
		}

		console.log(_response);

		nextPage = !!_response?.pagination.has_next_page;
		n++;
		response.push(...(_response?.data ?? []));
	}

	console.log(response);

	return response;
};
