<script lang="ts">
	import type { series as seriesTable } from '$lib/server/db/schema';
	import { seriesTypeEnum } from '$lib/utils/enums';
	import Icon from '@iconify/svelte';

	type Props = {
		series: typeof seriesTable.$inferInsert | undefined;
	};

	const { series }: Props = $props();
</script>

<div class=" flex w-min flex-col gap-1 text-sm select-none">
	<div class="relative aspect-37/53 h-55 overflow-hidden rounded-sm bg-base-300">
		{#if series?.coverUrl}
			<img
				src={series.coverUrl}
				alt={series.title}
				class="absolute inset-0 h-full w-full object-cover"
			/>
		{:else}
			<div class="flex h-full items-center justify-center">
				<Icon icon="lucide:circle-question-mark" class="w-1/2" width="none" />
			</div>
		{/if}
	</div>
	<h1 class="line-clamp-2 font-bold">
		{series?.title} &nbsp;
		<br />
		&nbsp;
	</h1>
	<div class=" mt-auto flex justify-between opacity-60">
		{#if series?.type && series?.year}
			<div class="flex items-center gap-1">
				<Icon icon="lucide:calendar-days" class="inline" />
				{new Date(series.year).getFullYear()}
			</div>
			<div class="flex items-center gap-1">
				{seriesTypeEnum.getByKey(series.type as any)}
				<Icon icon="lucide:tv" class="inline" />
			</div>
		{:else}
			&nbsp;
		{/if}
	</div>
</div>
