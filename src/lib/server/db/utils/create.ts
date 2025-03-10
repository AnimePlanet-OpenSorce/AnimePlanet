import { jikanAnimeById, jikanEpisodes } from '$lib/apiHandlers/jikan';
import { db } from '..';
import {
	anime,
	download,
	episode,
	tag,
	tagToAnime,
	video,
	type Anime,
	type CreateAnime,
	type CreateEpisode
} from '../schema';
import {
	episodeDbPrototype,
	linkDbPrototype,
	tagDbPrototype,
	tagToAnimeDbPrototype
} from './preFormating';

type CreateAnimeByMalId = { malId: number };

export const createAnimeByMalId = async ({ malId }: CreateAnimeByMalId) => {
	const animeMalData = await jikanAnimeById(malId);

	db.transaction(async (tx) => {
		const animePrototype: CreateAnime = {
			title: animeMalData.title,
			releaseDate: new Date(animeMalData.aired.from),
			coverImageUrl: animeMalData.images.webp.large_image_url,
			nsfw: animeMalData.nsfw,
			malId: animeMalData.mal_id
		};

		const [animeData] = await tx
			.insert(anime)
			.values(animePrototype)
			.onConflictDoUpdate({ target: anime.id, set: animePrototype })
			.returning();

		const tagsPrototype = tagDbPrototype(animeMalData.genres);
		await tx.insert(tag).values(tagsPrototype).onConflictDoNothing();
		await tx
			.insert(tagToAnime)
			.values(tagToAnimeDbPrototype(animeData.id, tagsPrototype))
			.onConflictDoNothing();

		if (animeMalData.type == 'Movie') {
			await tx
				.insert(episode)
				.values({
					animeId: animeData.id,
					episodeNumber: 0,
					title: 'Movie'
				})
				.onConflictDoNothing();
		} else {
			const episodesData = await jikanEpisodes(malId);

			if (episodesData.length > 0) {
				const episodePrototype = episodeDbPrototype(animeData.id, episodesData);
				await tx.insert(episode).values(episodePrototype).onConflictDoNothing();
			}
		}
	});
};

type CreateEpisodeByMal = {
	animeMalId: number;
	animeId: Anime['id'];
};

export const createEpisodeByMal = async ({ animeMalId, animeId }: CreateEpisodeByMal) => {
	const episodesData = await jikanEpisodes(animeMalId);
	if (episodesData.length > 0) {
		const episodePrototype = episodeDbPrototype(animeId, episodesData);
		await db.insert(episode).values(episodePrototype).onConflictDoNothing();
	}
};
export const createEpisode = async (episodeData: CreateEpisode) => {
	await db.insert(episode).values(episodeData);
};

type CreateLinksToEpisode = {
	downloadUrl?: string[];
	videoUrl?: string[];
	episodeId: string;
};
export const createLinksToEpisode = async ({
	downloadUrl,
	videoUrl,
	episodeId
}: CreateLinksToEpisode) => {
	const downloadPrototype = linkDbPrototype(episodeId, downloadUrl);
	const videoPrototype = linkDbPrototype(episodeId, videoUrl);

	if (downloadPrototype.length > 0)
		await db.insert(download).values(downloadPrototype).onConflictDoNothing();

	if (videoPrototype.length > 0)
		await db.insert(video).values(videoPrototype).onConflictDoNothing();
};
