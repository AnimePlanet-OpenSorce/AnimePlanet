<script lang="ts">
	import { goto } from '$app/navigation';
	import { group } from '$lib/actions/group';
	import { series } from '$lib/actions/series';
	import { cleanObject } from '$lib/actions/shared';
	import Cover from '$lib/component/Cover';
	import Form from '$lib/component/Form';
	import {
		Enum,
		seriesGenreEnum,
		seriesSeasonEnum,
		seriesTypeEnum,
		seriesYearEnum
	} from '$lib/utils/enums';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { queryParameters, ssp } from 'sveltekit-search-params';

	let { data }: { data: PageData } = $props();

	let filtersParams = queryParameters({
		title: ssp.string(),
		genre: ssp.array<string>(),
		year: ssp.array<string>(),
		season: ssp.array<string>(),
		type: ssp.array<string>(),
		group: ssp.array<string>()
	});

	let optionsParams = queryParameters({
		perPage: ssp.number(),
		page: ssp.number()
	});

	const paramsStoreReset = () => {
		goto('?');
	};

	let params: Parameters<typeof series.get.many>[0] = $derived.by(() => {
		return {
			options: cleanObject($optionsParams),
			filters: cleanObject($filtersParams)
		};
	});
	$inspect(params);

	let series_s = $derived(series.get.many({ ...params }));
</script>

<div class="flex flex-col gap-12 px-4 py-1">
	<div class="flex flex-col">
		<Form class="flex gap-4 *:grid *:w-full *:gap-1 **:[h3]:text-2xl **:[h3]:font-bold">
			<div>
				<h3>Tytuł</h3>
				<Form.Field bind:value={$filtersParams.title} placeholder="Dowolny" />
			</div>
			<div>
				<h3>Gatunek</h3>
				<Form.ComboBox
					multiple
					options={seriesGenreEnum}
					bind:value={$filtersParams.genre}
					placeholder="Dowolny"
				/>
			</div>
			<div>
				<h3>Rok</h3>
				<Form.ComboBox
					multiple
					options={seriesYearEnum}
					bind:value={$filtersParams.year}
					placeholder="Dowolny"
				/>
			</div>
			<div>
				<h3>Sezon</h3>
				<Form.ComboBox
					multiple
					options={seriesSeasonEnum}
					bind:value={$filtersParams.season}
					placeholder="Dowolny"
				/>
			</div>
		</Form>
		<Form class="flex gap-4 *:grid *:w-full *:gap-1 **:[h3]:text-2xl **:[h3]:font-bold">
			<dir>
				<h3>Typ</h3>
				<Form.ComboBox
					multiple
					options={seriesTypeEnum}
					bind:value={$filtersParams.type}
					placeholder="Dowolny"
				/>
			</dir>
			<div>
				<h3>Grupa</h3>
				<Form.ComboBox
					multiple
					filterFn={async (filter) => {
						const { data } = await group.get.many({
							filters: {
								name: filter
							}
						});

						return new Enum(Object.fromEntries(data.map((v) => [v.id, v.name])));
					}}
					bind:value={$filtersParams.group}
					placeholder="Dowolny"
				/>
			</div>
			<div class="!w-fit items-end">
				<button type="button" onclick={paramsStoreReset} class="btn btn-square p-2.5 btn-secondary">
					<Icon icon="lucide:trash" width="none" class="h-full" />
				</button>
			</div>
			<!-- <Form.Clear /> -->
		</Form>
	</div>

	<div class="mx-8 flex flex-wrap gap-8">
		{#if series_s.ready}
			{#each series_s.current.data as series}
				<Cover {series} />
			{/each}
		{:else if series_s.loading}
			{#each { length: 50 }}
				<Cover.Preview />
			{/each}
		{/if}
	</div>
</div>
