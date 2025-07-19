import { pgEnum } from 'drizzle-orm/pg-core';

export const userRole_Enum = pgEnum('user_role', ['root', 'admin', 'moderator']);

export const content_Enum = pgEnum('content', ['all', 'subtitles', 'lector']);

export const seriesType_Enum = pgEnum('series_type', ['episode', 'ova', 'ona', 'special', 'movie']);

export const seriesRelationType_Enum = pgEnum('series_relation_type', [
	'sequel',
	'prequel',
	'spin_off',
	'side_story',
	'alternative_version',
	'alternative_setting',
	'parent_story',
	'summary',
	'full_story',
	'other'
]);

export const groupType_Enum = pgEnum('group_type', ['all', 'subtitles', 'lector']);

export const sourceStatus_Enum = pgEnum('source_status', ['active', 'inactive', 'awaiting']);

export const legacyPlayerType_Enum = pgEnum('legacy_player_type', ['video', 'download']);
