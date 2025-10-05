import type { seriesStatus_Enum } from '$lib/server/db/schema';
import { Enum } from './enum';

// TODO
export const seriesStatusEnum = new Enum<(typeof seriesStatus_Enum.enumValues)[number], string>({
	airing: 'Wydawane',
	not_yet_aired: 'Oczekujące',
	cancelled: 'Przerwane',
	finished: 'Ukończone',
	banned: 'Banned'
});
