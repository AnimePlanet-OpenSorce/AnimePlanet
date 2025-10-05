import { type } from 'arktype';

export type GetManyResponse<T> = Promise<{
	data: T[];
	pagination: {
		lastVisiblePage: number;
		hasNextPage: boolean;
	};
}>;

export const GetManyOptions = type({
	perPage: '(number | "all") = 12',
	page: 'number = 0'
}).default(() => ({}));

export type FormResult<
	T = null,
	E = {
		global?: string[];
	} & {
		[key: string]: string[] | undefined;
	}
> = Promise<
	| {
			data: T;
			errors?: never;
	  }
	| {
			data?: never;
			errors: E;
	  }
>;

export const errorsParse = <T extends object>(errors: T) =>
	Object.fromEntries(
		Object.entries(errors).map((v): [string, string[]] => {
			const [key, value] = v;
			if (Array.isArray(value)) {
				return [key, value];
			} else {
				return [key, value._errors ?? []];
			}
		})
	);
