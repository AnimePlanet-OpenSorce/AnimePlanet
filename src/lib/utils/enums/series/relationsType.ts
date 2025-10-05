import type { seriesRelationType_Enum } from '$lib/server/db/schema';
import { Enum } from '../enum';

export const seriesRelationTypeEnum = new Enum<
	(typeof seriesRelationType_Enum.enumValues)[number],
	string
>({
	alternative: 'Alternatywna Wersja',
	other: 'Inna',
	parent: 'Główna seria',
	prequel: 'Prequel',
	sequel: 'Sequele',
	side_story: 'Historia poboczna',
	spin_off: 'Spin Off',
	summary: 'Streszczenie'
});
