<script lang="ts">
	import { getSeries, type GetSeriesProps } from '$lib/actions/series.remote';
	import Cover from '$lib/component/Cover';
	import FormQuery from '$lib/component/FormQuery';
	import {
		Enum,
		seriesSeasonEnum,
		seriesTypeEnum,
		seriesYearEnum,
		sourceStatusEnum
	} from '$lib/utils/enums';
	import { tagEnum } from '$lib/utils/enums/tagEnum';
	import type { PageData } from './$types';
	import { queryParameters, ssp } from 'sveltekit-search-params';

	let { data }: { data: PageData } = $props();

	let paramsStore = queryParameters({
		title: ssp.string(),
		tag: ssp.array<string>(),
		year: ssp.array<string>(),
		season: ssp.array<string>(),
		type: ssp.array<string>(),
		status: ssp.array<string>(),
		group: ssp.array<string>(),

		perPage: ssp.number(),
		page: ssp.number()
	});

	let params: GetSeriesProps = $derived.by(() => {
		const { perPage, page, ...filters } = $paramsStore;
		return {
			options: cleanObject({
				perPage,
				page
			}),
			filters: cleanObject(filters)
		};
	});

	function cleanObject<T extends object>(obj: T): { [P in keyof T]?: NonNullable<T[P]> } {
		return Object.fromEntries(Object.entries(obj).filter(([_, value]) => !!value)) as {
			[P in keyof T]?: NonNullable<T[P]>;
		};
	}

	let seriesArray = $derived(getSeries({ ...params }));
</script>

<div class="flex flex-col gap-12 px-4 py-1">
	<div class="flex flex-col">
		<FormQuery>
			<FormQuery.Field title="Tytuł" icon="lucide:search" name="title" />

			<svelte:boundary>
				<FormQuery.ComboBox options={await tagEnum()} title="Gatunek" name="tag" />

				{#snippet pending()}
					<FormQuery.ComboBox options={new Enum()} title="Gatunek" name="" />
				{/snippet}
			</svelte:boundary>

			<FormQuery.ComboBox options={seriesYearEnum} title="Rok" name="year" />
			<FormQuery.ComboBox options={seriesSeasonEnum} title="Sezon" name="season" />
		</FormQuery>
		<FormQuery>
			<FormQuery.ComboBox options={seriesTypeEnum} title="Format" name="type" />
			<FormQuery.ComboBox options={sourceStatusEnum} title="Status" name="status" />
			<FormQuery.ComboBox options={new Enum({})} title="Grupa" name="group" />

			<FormQuery.Clear />
		</FormQuery>
	</div>

	<div class="mx-8 flex flex-wrap gap-8">
		{#if seriesArray.ready}
			{#each seriesArray.current as series}
				<Cover {series} />
			{/each}
		{:else if seriesArray.loading}
			{#each { length: 50 }}
				<Cover.Preview />
			{/each}
		{/if}
	</div>
</div>
