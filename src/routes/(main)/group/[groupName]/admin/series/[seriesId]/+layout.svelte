<script lang="ts">
	import { seriesSeasonEnum, seriesTypeEnum } from '$lib/utils/enums';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	const dateFormat = new Intl.DateTimeFormat('pl', { dateStyle: 'medium' });

	const bonusData: Record<string, string | string[] | undefined> = {
		'Typ serii': seriesTypeEnum.getByKey(data.series.type),
		Sezon: seriesSeasonEnum.getByKey(data.series.season),
		'Data wydania': dateFormat.format(data.series.year),
		Gatunki: data.series.genre_s,
		NSFW: data.series.nsfw ? 'Tak' : 'Nie'
	};
</script>

<div class="flex gap-4">
	<div class="relative aspect-37/53 min-w-max overflow-hidden rounded-sm bg-base-300">
		<img
			src={data.series.coverUrl}
			alt={data.series.title}
			class="absolute inset-0 h-full w-full object-cover"
		/>
	</div>
	<div class=" flex w-full max-w-2xl flex-col gap-2">
		<h3 class="text-2xl font-bold">{data.series.title}</h3>
		<textarea
			placeholder="Opis"
			class="textarea h-full w-full"
			value={data.series.description}
			readonly
		></textarea>
	</div>
	<div class="grid max-w-sm grid-cols-[auto_1fr] gap-x-4 rounded-md bg-base-200 p-2">
		{#each Object.entries(bonusData) as [key, data]}
			<div class="col-span-full grid grid-cols-subgrid px-2">
				<div>{key}:</div>
				<div>{data}</div>
			</div>
			<div class="col-span-full divider m-0 last:hidden"></div>
		{/each}
	</div>
</div>
<div class="divider"></div>
{@render children()}
