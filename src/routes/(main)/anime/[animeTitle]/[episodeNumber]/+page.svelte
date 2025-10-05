<script lang="ts">
	import * as actions from '$lib/actions/episode';
	import Episode from '$lib/component/Episode';
	import Video from '$lib/component/Video';
	import type { PageProps } from './$types';

	let { data, params }: PageProps = $props();

	const episodes = await actions.episode.get.many({
		filters: {
			seriesId: data.series.id
		}
	});
</script>

<div class="flex max-h-svh *:pt-4">
	<div class="flex w-full flex-col gap-4">
		<Video></Video>
		<div class="flex justify-between">
			<div class="px-4">
				<h1 class="text-2xl font-bold">{data.episode.number}. {data.episode.title}</h1>
			</div>
		</div>
		<div class="ml-auto flex w-fit gap-4 *:grid *:min-w-md *:gap-2">
			{#if data.prevEpisode}
				<div>
					<span class="text-xl font-semibold"> Poprzedni odcinek: </span>
					<Episode {...data.prevEpisode} href="./{data.prevEpisode.number}" />
				</div>
			{/if}
			{#if data.nextEpisode}
				<div>
					<span class="text-xl font-semibold"> Następny odcinek: </span>
					<Episode {...data.nextEpisode} href="./{data.nextEpisode.number}" />
				</div>
			{/if}
		</div>
	</div>
	<div class="grid h-full min-w-lg grid-flow-row gap-4 overflow-x-scroll overflow-y-visible p-4">
		{#each episodes.data as episode}
			<Episode {...episode} href="./{episode.number}" />
		{/each}
	</div>
</div>
