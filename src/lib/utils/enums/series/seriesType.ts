import type { series } from '$lib/server/db/schema';
import { Enum } from '../enum';

export const seriesTypeEnum = new Enum<typeof series.$inferSelect.type, string>({
	tv: 'TV Series',
	movie: 'Movie',
	ona: 'ONA',
	ova: 'OVA',
	special: 'Spacial'
});
