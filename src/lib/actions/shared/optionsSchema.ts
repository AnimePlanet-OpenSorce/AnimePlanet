import { type } from 'arktype';

export const optionsSchema = type({
	perPage: 'number = 50',
	page: type('number')
		.pipe((n) => n - 1)
		.default(1)
}).default(() => ({}));
