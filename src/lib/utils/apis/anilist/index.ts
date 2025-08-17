import { query } from '$app/server';
import { cacheExchange, Client, fetchExchange, queryStore } from '@urql/svelte';
import { graphql } from 'gql.tada';

export const anilist = new Client({
	url: 'https://graphql.anilist.co',
	exchanges: [cacheExchange, fetchExchange],
	preferGetMethod: false
});

export const searchAnimeByTitleQuery = graphql(`
	query SearchAnimeByTitle($title: String) {
		Page {
			media(type: ANIME, search: $title) {
				idMal

				title {
					romaji
					english
				}
			}
		}
	}
`);

export const getAnimeCoverById = graphql(`
	query GetAnimeCoverById($malId: Int) {
		Media(idMal: $malId) {
			coverImage {
				large
			}
		}
	}
`);

export const searchAnime = async (title: string) =>
	await anilist.query(searchAnimeByTitleQuery, { title: title.length > 0 ? title : undefined });

export const getAnimeCover = async (malId: unknown) => {
	if (!malId) return;
	return await anilist.query(getAnimeCoverById, { malId: Number(malId) });
};
