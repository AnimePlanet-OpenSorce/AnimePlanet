<script lang="ts">
	import { type series as seriesType } from '$lib/server/db/schema';
	import { seriesTypeEnum } from '$lib/utils/enums';
	import { encodeUrl } from '$lib/utils/url';
	import Icon from '@iconify/svelte';

	type Props = {
		series: typeof seriesType.$inferSelect;
		href?: string;
	};

	const { series, href = `/anime/${encodeUrl(series.title)}` }: Props = $props();
</script>

<a {href} class=" flex w-min flex-col gap-1 text-sm select-none">
	<div class="relative aspect-37/53 h-55 overflow-hidden rounded-sm bg-base-300">
		<img
			src={series.coverUrl}
			alt={series.title}
			class="absolute inset-0 h-full w-full object-cover"
		/>
	</div>
	<h1 class="line-clamp-2 font-bold">
		{series.title}
	</h1>
	<div class=" mt-auto flex justify-between opacity-60">
		<div class="flex items-center gap-1">
			<Icon icon="lucide:calendar-days" class="inline" />
			{new Date(series.year).getFullYear()}
		</div>
		<div class="flex items-center gap-1">
			{seriesTypeEnum.getByKey(series.type)}
			<Icon icon="lucide:tv" class="inline" />
		</div>
	</div>
</a>
