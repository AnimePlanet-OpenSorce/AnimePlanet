import type { source } from '$lib/server/db/schema';
import { Enum } from './enum';


// TODO
export const sourceStatusEnum = new Enum<typeof source.$inferSelect.status, string>({
	airing: 'Wydawane',
	not_yet_aired: 'Oczekujące',
	cancelled: 'Przerwane',
	finished: 'Ukończone',
	banned: 'Banned'
});
