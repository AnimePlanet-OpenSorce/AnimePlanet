import { type } from 'arktype';

export const optionsSchema = type({
	perPage: 'number = 50',
	page: type('number')
		.pipe((n) => n - 1)
		.default(1)
}).default(() => ({}));

export const cleanObject = <T extends Record<string, unknown>>(
	filters: T
): { [P in keyof T]?: NonNullable<T[P]> } => {
	const result: { [P in keyof T]?: NonNullable<T[P]> } = {};

	for (const key in filters) {
		const value = filters[key];

		// pomijamy undefined, null i puste tablice
		if (
			value !== undefined &&
			value !== null &&
			!((Array.isArray(value) || typeof value === 'string') && value.length === 0)
		) {
			result[key] = value;
		}
	}

	return result;
};
