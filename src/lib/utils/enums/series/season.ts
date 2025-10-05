import type { seriesSeason_Enum } from '$lib/server/db/schema';
import { Enum } from '../enum';

export const seriesSeasonEnum = new Enum<(typeof seriesSeason_Enum.enumValues)[number], string>({
	spring: 'Wiosna',
	summer: 'Lato',
	fall: 'Jesień',
	winter: 'Zima'
});
