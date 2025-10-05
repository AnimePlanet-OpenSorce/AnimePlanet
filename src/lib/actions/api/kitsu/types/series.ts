import { type } from 'arktype';

export default type({
	id: 'string',
	type: "'anime'",
	links: {
		self: 'string.url'
	},
	attributes: {
		createdAt: 'string.date',
		updatedAt: 'string.date',
		slug: 'string',
		synopsis: 'string',
		description: 'string',
		'coverImageTopOffset?': 'number',
		titles: {
			'en?': 'string',
			'en_jp?': 'string',
			'ja_jp?': 'string'
		},
		canonicalTitle: 'string',
		abbreviatedTitles: 'string[]',
		'averageRating?': 'string',
		ratingFrequencies: {
			'[string | symbol]': 'string'
		},
		userCount: 'number',
		favoritesCount: 'number',
		startDate: 'string.date',
		endDate: 'string.date | null',
		nextRelease: 'string.date | null',
		popularityRank: 'number',
		ratingRank: 'number',
		ageRating: 'string',
		ageRatingGuide: 'string',
		subtype: 'string',
		status: 'string',
		tba: 'string | null',
		posterImage: {
			tiny: 'string.url',
			large: 'string.url',
			small: 'string.url',
			medium: 'string.url',
			original: 'string.url',
			meta: {
				dimensions: {
					'tiny?': { width: 'number', height: 'number' },
					'large?': { width: 'number', height: 'number' },
					'small?': { width: 'number', height: 'number' },
					'medium?': { width: 'number', height: 'number' }
				}
			}
		},
		'coverImage?': {
			'tiny?': 'string.url',
			'large?': 'string.url',
			'small?': 'string.url',
			'original?': 'string.url',
			meta: {
				dimensions: {
					'tiny?': { width: 'number', height: 'number' },
					'large?': { width: 'number', height: 'number' },
					'small?': { width: 'number', height: 'number' }
				}
			}
		},
		episodeCount: 'number | null',
		'episodeLength?': 'number',
		'totalLength?': 'number',
		'youtubeVideoId?': 'string',
		showType: 'string',
		nsfw: 'boolean'
	},
	relationships: {
		'[string | symbol]': {
			links: { self: 'string.url', related: 'string.url' }
		}
	}
});
