import { form } from '$app/server';
import { cleanObject } from '$lib/actions/shared';
import { db } from '$lib/server/db';
import { episode } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createInsertSchema } from 'drizzle-arktype';

const episodeSchema = createInsertSchema(episode);

const props = type({
	seriesId: ['string', '=>', episodeSchema.get('seriesId')],
	episode_s: type({
		number: 'string',
		title: 'string > 0',
		duration: ['string', '=>', (str) => Number(str)],
		description: 'string',
		coverUrl: 'string',
		malId: ['string', '=>', (str) => Number(str)]
	})
		.pipe.try((v) => cleanObject(v), episodeSchema.omit('id', 'seriesId'))
		.array()
});

export const episodeCreateMany = form(props, async ({ seriesId, episode_s }) => {
	try {
		await db.transaction(async (tx) => {
			const createdEpisodes = await tx
				.insert(episode)
				.values(
					episode_s.map((v) => ({
						seriesId,
						...v
					}))
				)
				.returning()
				.onConflictDoNothing();

			if (createdEpisodes.length !== episode_s.length) tx.rollback();
		});
	} catch (e) {
		console.error('episodeCreateMany:', e);
	}
});
