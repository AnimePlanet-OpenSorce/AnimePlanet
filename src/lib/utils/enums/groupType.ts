import type { groupType_Enum } from '$lib/server/db/schema';
import { Enum } from './enum';

export const groupTypeEnum = new Enum<(typeof groupType_Enum.enumValues)[number], string>({
	lector: 'Lektor',
	subtitles: 'Napisy',
});
