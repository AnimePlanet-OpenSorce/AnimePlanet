import { type } from 'arktype';

export default type({
	id: 'string',
	type: 'string', // można zawęzić np. do "mappings"
	links: {
		self: 'string.url'
	},
	attributes: {
		createdAt: 'string | null',
		updatedAt: 'string | null',
		externalSite: 'string',
		externalId: 'string'
	},
	relationships: {
		item: {
			links: {
				self: 'string.url',
				related: 'string.url'
			},
			data: {
				type: "'anime'",
				id: 'string'
			}
		}
	}
});
