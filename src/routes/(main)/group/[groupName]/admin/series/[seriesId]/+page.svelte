<script lang="ts">
	import { page } from '$app/state';
	import { episode } from '$lib/actions/episode';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const episode_s = await episode.get.many({
		filters: {
			seriesId: data.series.id
		}
	})
</script>

{#if data.series.type === 'movie'}
	<div></div>
{:else}
	<div class="flex flex-wrap gap-2">
		{#each episode_s.data as { number, title, id }}
			<a
				class="flex h-15 w-2xs items-center gap-2 rounded-sm bg-base-300 p-2"
				href="{page.url.toString()}/{id}"
			>
				<div
					class="flex aspect-square h-full items-center justify-center rounded-xs bg-secondary text-secondary-content"
				>
					{number}
				</div>
				<div class="truncate">{title}</div>
			</a>
		{/each}
	</div>
{/if}
