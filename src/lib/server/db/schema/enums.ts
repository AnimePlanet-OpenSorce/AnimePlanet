import { pgEnum } from 'drizzle-orm/pg-core';

export const userRole_Enum = pgEnum('user_role', ['root', 'admin', 'moderator']);

export const content_Enum = pgEnum('content', ['subtitles', 'lector']);

export const seriesType_Enum = pgEnum('series_type', ['tv', 'ova', 'ona', 'special', 'movie']);

export const seriesSeason_Enum = pgEnum('series_season', ['spring', 'summer', 'fall', 'winter']);

export const seriesRelationType_Enum = pgEnum('series_relation_type', [
	'prequel',
	'sequel',
	'parent',
	'side_story',
	'summary',
	'alternative',
	'spin_off',
	'other'
]);

export const groupType_Enum = pgEnum('group_type', ['subtitles', 'lector']);

export const seriesStatus_Enum = pgEnum('series_status', [
	'airing',
	'finished',
	'not_yet_aired',
	'cancelled',
	'banned'
]);

export const legacyPlayerType_Enum = pgEnum('legacy_player_type', ['video', 'download']);

export const seriesGenre_Enum = pgEnum('series_genre', [
	'action',
	'adventure',
	'comedy',
	'drama',
	'ecchi',
	'fantasy',
	'hentai',
	'horror',
	'mahou shoujo',
	'mecha',
	'music',
	'mystery',
	'psychological',
	'romance',
	'sci-fi',
	'slice of life',
	'sports',
	'supernatural',
	'thriller'
]);
