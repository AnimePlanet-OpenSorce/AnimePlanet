<script lang="ts">
	import { goto } from '$app/navigation';
	import { kitsu } from '$lib/actions/api/kitsu';
	import { episode } from '$lib/actions/episode';
	import Episode from '$lib/component/Episode';
	import Form from '$lib/component/Form';
	import type { episode as episodeTable } from '$lib/server/db/schema';
	import { cn } from '$lib/utils/cn';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const existEpisode_s = new Set(
		(
			await episode.get.many({
				filters: {
					seriesId: data.series.id
				},
				options: { perPage: 'all' }
			})
		).data
			.map(({ malId }) => malId)
			.filter((v): v is number => !!v)
	);

	type Episode = typeof episodeTable.$inferInsert;

	let episode_s: (Episode & { exist: boolean })[] = $state([]);

	const sync = {
		kitsu: async () => {
			syncState = 'load';

			const _data = await kitsu.episode.get.many({ seriesMalId: data.series.malId });

			episode_s = _data.map(({ attributes }): (typeof episode_s)[number] => ({
				seriesId: data.series.id,

				title: attributes.canonicalTitle,
				number: String(attributes.number),
				duration: attributes.length,

				coverUrl: attributes.thumbnail?.original,
				malId: attributes.number,

				exist: existEpisode_s.has(attributes.number)
			}));

			syncState = 'done';
		}
	};

	let syncState: 'done' | 'load' = $state('done');
</script>

{syncState}
<Form
	{...episode.create.many.enhance(async ({ submit }) => {
		try {
			await submit();
		} finally {
			goto('.');
		}
	})}
	class="flex max-w-6xl flex-col gap-4"
>
	<input
		type="text"
		value={data.series.id}
		name={episode.create.many.field('seriesId')}
		class="hidden"
	/>
	<div class="flex gap-2">
		<div class="join">
			<div class="join-item flex items-center bg-base-300 px-4 font-semibold">Synchronizuj:</div>
			<button onclick={sync.kitsu} class="btn join-item btn-secondary" type="button">
				Kitsu
			</button>
		</div>

		<button type="submit" class="btn ml-auto btn-secondary">Utwórz</button>
	</div>
	{#if syncState === 'load'}
		<div class="flex h-50 w-full justify-center">
			<span class="loading loading-xl loading-spinner"></span>
		</div>
	{/if}
	<div class="grid grid-cols-2 gap-4">
		{#each episode_s as _episode, idx}
			{@const disable = _episode.exist}
			<div
				class={cn(
					'flex flex-col gap-2 rounded-lg bg-base-200 p-4 drop-shadow-md *:drop-shadow-sm',
					{
						'brightness-50': disable
					}
				)}
			>
				<Episode {..._episode} />
				{#if !disable}
					<div class="grid grid-cols-2 gap-4 rounded-md bg-base-300 p-2">
						<Form.Field
							form={episode.create.many}
							field="episode_s[{idx}].number"
							placeholder="Numer odcinka"
							bind:value={_episode.number}
						/>
						<Form.Field
							form={episode.create.many}
							field="episode_s[{idx}].title"
							placeholder="Tytuł odcinka"
							bind:value={_episode.title}
						/>

						<div class="col-span-full">
							<Form.Field
								form={episode.create.many}
								field="episode_s[{idx}].coverUrl"
								placeholder="Okładka odcinka"
								bind:value={_episode.coverUrl}
							/>
						</div>

						<Form.Field
							form={episode.create.many}
							field="episode_s[{idx}].duration"
							placeholder="Długość odcinka"
							bind:value={_episode.duration}
						/>
						<Form.Field
							form={episode.create.many}
							field="episode_s[{idx}].malId"
							placeholder="MAL ID odcinka"
							bind:value={_episode.malId}
						/>

						<Form.Textarea
							labelClass="col-span-full w-full"
							form={episode.create.many}
							field="episode_s[{idx}].description"
							placeholder="Opis odcinka"
							bind:value={_episode.description}
						/>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</Form>
