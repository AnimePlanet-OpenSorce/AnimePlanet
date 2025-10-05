import { form } from '$app/server';
import { api } from '$lib/actions/api';
import { db } from '$lib/server/db';
import { groupToSource, legacyPlayer, player, source } from '$lib/server/db/schema';
import { type } from 'arktype';
import { createInsertSchema } from 'drizzle-arktype';

const hashReg = /^(?:magnet:\?xt=urn:[a-z0-9]+:)?([a-z0-9]{40}|[a-z0-9]{32})&?.*$/;

const props = type({
	episodeId: createInsertSchema(source).get('episodeId'),
	group_s: createInsertSchema(groupToSource).get('groupId').array()
}).merge(
	type(
		type({ playerType: '"player"' }, '&', {
			torrent: type(hashReg).pipe.try(
				(s) => hashReg.exec(s)?.at(1),
				type('string == 32', '|', 'string == 40')
			),
			'subtitles?': 'File | undefined',
			'audio?': 'File | undefined'
		}),
		'|',
		type({ playerType: '"legacyPlayer"' }, '&', createInsertSchema(legacyPlayer))
	)
);

export const sourceCreate = form(props, async ({ episodeId, group_s, ...playerData }) => {
	await db.transaction(async (tx) => {
		const [createdSource] = await tx
			.insert(source)
			.values({
				episodeId: episodeId
			})
			.returning()
			.onConflictDoNothing();

		if (!createdSource) {
			tx.rollback();
		}

		const [createdGroupToSource] = await tx
			.insert(groupToSource)
			.values(
				group_s.map((v): typeof groupToSource.$inferInsert => ({
					groupId: v,
					sourceId: createdSource.id
				}))
			)
			.returning()
			.onConflictDoNothing();

		if (!createdGroupToSource) {
			tx.rollback();
		}

		if (playerData.playerType === 'player') {
			let audio: Awaited<ReturnType<typeof api.s3.create>> | undefined;
			let subtitles: Awaited<ReturnType<typeof api.s3.create>> | undefined;
			try {
				if (playerData.audio) {
					audio = await api.s3.create({ file: playerData.audio });
				}
				if (playerData.subtitles) {
					subtitles = await api.s3.create({ file: playerData.subtitles });
				}
			} catch {
				tx.rollback();
			}

			const [createdPlayer] = await tx
				.insert(player)
				.values({
					sourceId: createdSource.id,
					torrentUrl: playerData.torrent,
					audioUrl: audio?.url,
					subtitlesUrl: subtitles?.url
				})
				.returning();

			if (!createdPlayer) {
				tx.rollback();
			}
		}

		if (playerData.playerType === 'legacyPlayer') {
			const [createdLegacyPlayer] = await tx.insert(legacyPlayer).values(playerData).returning();

			if (!createdLegacyPlayer) {
				tx.rollback();
			}
		}
	});
});
