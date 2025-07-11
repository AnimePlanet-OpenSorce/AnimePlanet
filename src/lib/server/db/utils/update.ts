import { jikanEpisodes } from '$lib/apiHandlers/jikan';
import { db } from '..';
import {
	anime,
	download,
	episode,
	tagToAnime,
	video,
	type Anime,
	type CreateVideo,
	type CreateDownload,
	type Episode
} from '../schema';
import { episodeDbPrototype, tagToAnimeDbPrototype } from './preFormating';
import { and, eq, inArray } from 'drizzle-orm';
import { createRegExp, not, oneOrMore } from 'magic-regexp';

const regEmbed = createRegExp(oneOrMore(not.whitespace).after('src="').before('"'));

type UpdateAnimeById = {
	animeId: Anime['id'];
	title: string;
	tags: string[];
	embeds?: CreateVideo[];
	downloads?: CreateDownload[];
};

export const updateAnimeById = async ({
	animeId,
	title,
	tags,
	embeds,
	downloads
}: UpdateAnimeById) => {
	db.transaction(async (tx) => {
		await tx.update(anime).set({ title }).where(eq(anime.id, animeId));

		const oldTagsObj = await tx.query.tagToAnime.findMany({
			where: (tagToAnime, { eq }) => eq(tagToAnime.animeId, animeId)
		});

		const oldTags = new Set(oldTagsObj.map(({ tag }) => tag));
		const newTags = new Set(tags);

		const tagsToRemove = oldTags.difference(newTags);
		const tagsToAdd = newTags.difference(oldTags);

		await tx
			.delete(tagToAnime)
			.where(and(eq(tagToAnime.animeId, animeId), inArray(tagToAnime.tag, [...tagsToRemove])));

		const tagsPrototype = tagToAnimeDbPrototype(animeId, [...tagsToAdd]);
		if (tagsPrototype.length > 0) await tx.insert(tagToAnime).values(tagsPrototype);

		if (embeds) {
			embeds = embeds.map((embed) => {
				if (regEmbed.test(embed.url)) {
					embed.url = embed.url.match(regEmbed)?.[0] as string;

					return {
						...embed
					};
				} else {
					return embed;
				}
			});
			await tx.insert(video).values(embeds);
		}
		if (downloads) await tx.insert(download).values(downloads);
	});
};

type UpdateEpisodesList = {
	malId: number;
	animeId: Anime['id'];
};

export const updateEpisodesList = async ({ malId, animeId }: UpdateEpisodesList) => {
	const episodesData = await jikanEpisodes(malId);
	const episodePrototype = episodeDbPrototype(animeId, episodesData);

	await db.insert(episode).values(episodePrototype).onConflictDoNothing();
};

type UpdateEpisode = Omit<Episode, 'animeId'>;

export const updateEpisode = async ({ id, title, episodeNumber }: UpdateEpisode) => {
	await db.update(episode).set({ title, episodeNumber }).where(eq(episode.id, id));
};
