export * from './optionsSchema';
export * from './form';

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export function omit<T extends object, K extends keyof T>(
	obj: T,
	...keys: readonly K[]
): Prettify<Omit<T, K>> {
	return (Object.keys(obj) as (keyof T)[]).reduce(
		(acc, key) => {
			if (!keys.includes(key as K)) {
				(acc as T)[key] = obj[key];
			}
			return acc;
		},
		{} as Omit<T, K>
	);
}

export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
	const result = {} as Pick<T, K>;
	for (const key of keys) {
		if (key in obj) {
			result[key] = obj[key];
		}
	}
	return result;
}
