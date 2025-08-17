import type { series } from '$lib/server/db/schema';
import { Enum } from '../enum';

export const seriesSeasonEnum = new Enum<typeof series.$inferSelect.season, string>({
	spring: 'Wiosna',
	summer: 'Lato',
	fall: 'Jesień',
	winter: 'Zima'
});
