import type { group } from '$lib/server/db/schema';
import { Enum } from './enum';

export const groupTypeEnum = new Enum<typeof group.$inferSelect.type, string>({
	all: 'Wszystkie',
	lector: 'Lektor',
	subtitles: 'Napisy'
});
