import type { seriesType_Enum } from '$lib/server/db/schema';
import { Enum } from '../enum';

export const seriesTypeEnum = new Enum<(typeof seriesType_Enum.enumValues)[number], string>({
	tv: 'TV Series',
	movie: 'Movie',
	ona: 'ONA',
	ova: 'OVA',
	special: 'Spacial'
});
