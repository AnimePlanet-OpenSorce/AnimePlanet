import { type } from 'arktype';

export default type({
	id: 'string',
	type: "'episodes'",
	links: {
		self: 'string.url'
	},
	attributes: {
		createdAt: 'string.date | null',
		updatedAt: 'string.date | null',
		'synopsis?': 'string | null',
		'description?': 'string | null',
		'titles?': {
			'en_jp?': 'string | null',
			'en_us?': 'string | null',
			'ja_jp?': 'string | null'
		},
		canonicalTitle: ['string | null', '=>', (str) => str ?? ''],
		'seasonNumber?': 'number | null',
		number: 'number',
		'relativeNumber?': 'number | null',
		'airdate?': 'string.date | null',
		length: 'number',
		'thumbnail?': [
			{
				'original?': 'string.url',
				meta: {
					dimensions: 'object'
				}
			},
			'|',
			'null'
		]
	},
	relationships: {
		media: {
			links: {
				self: 'string.url',
				related: 'string.url'
			}
		},
		videos: {
			links: {
				self: 'string.url',
				related: 'string.url'
			}
		}
	}
});
