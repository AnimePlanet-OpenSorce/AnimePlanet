import episode from './episode';
import mapping from './mapping';
import series from './series';
import { type } from 'arktype';

const metaData = type({
	meta: {
		count: 'number'
	},
	links: {
		first: 'string.url',
		'prev?': 'string.url',
		'next?': 'string.url',
		last: 'string.url'
	}
});
const kitsuResponse = <const Data, const Included>({
	data,
	included
}: {
	data?: type.validate<Data>;
	included?: type.validate<Included>;
}): type.instantiate<{ data: Data; included: Included } & typeof metaData.infer> =>
	metaData.merge({
		'data?': type.raw(data),
		'included?': type.raw(included)
	}) as never;

export const kitsuParser = {
	episode: kitsuResponse({
		data: episode.array(),
		included: 'never'
	}),
	mapping: kitsuResponse({
		data: mapping.array(),
		included: series.array()
	})
};
