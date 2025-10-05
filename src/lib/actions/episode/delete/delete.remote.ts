import { command } from '$app/server';
import { db } from '$lib/server/db';
import { episode } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createSelectSchema } from 'drizzle-arktype';
import { eq } from 'drizzle-orm';

const props = type({
	episodeId: createSelectSchema(episode).get('id')
});

export const episodeDelete = command(props, async ({ episodeId }) => {
	try {
		return await db.delete(episode).where(eq(episode.id, episodeId)).returning();
	} catch (e) {
		console.error('episodeDelete:', e);
	}
});
