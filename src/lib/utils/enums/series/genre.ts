import type { seriesGenre_Enum } from '$lib/server/db/schema';
import { Enum } from '../enum';

export const seriesGenreEnum = new Enum<
	(typeof seriesGenre_Enum.enumValues)[number],
	string
>(
	// TODO: Zamieni to gówno na prawdziwy enum
	[
		'action',
		'adventure',
		'comedy',
		'drama',
		'ecchi',
		'fantasy',
		'hentai',
		'horror',
		'mahou shoujo',
		'mecha',
		'music',
		'mystery',
		'psychological',
		'romance',
		'sci-fi',
		'slice of life',
		'sports',
		'supernatural',
		'thriller'
	].map((str): any => [str, str])
);
