<script lang="ts">
	import { getSeries } from '$lib/actions/series.remote';
	import Cover from '$lib/component/Cover';
	import Dialog from '$lib/component/Dialog/Dialog.svelte';
	import Form from '$lib/component/Form';
	import FormQuery from '$lib/component/FormQuery';
	import { getAnimeCover, searchAnime } from '$lib/utils/apis/anilist/index';
	import '$lib/utils/enums';
	import { Enum } from '$lib/utils/enums';
	import { tagEnum } from '$lib/utils/enums/tagEnum';
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { superForm } from 'sveltekit-superforms';

	let { data }: PageProps = $props();

	let seriesArray = $derived(getSeries({}));

	const superform = superForm(data.form);

	let title = $state('');
	let animeArray = $derived(
		createQuery({
			queryKey: ['animeArray', title],
			queryFn: async () =>
				new Enum(
					Object.fromEntries(
						(await searchAnime(title)).data?.Page?.media?.map((v) => [
							String(v?.idMal),
							String(v?.title?.romaji)
						]) ?? []
					)
				)
		})
	);

	let selectedAnime = $state([]);
	let cover = $derived(
		createQuery({
			queryKey: ['cover', selectedAnime],
			queryFn: async () =>
				(await getAnimeCover(selectedAnime.at(0)))?.data?.Media?.coverImage?.large ?? ''
		})
	);
</script>

<div class="flex flex-col gap-4">
	<FormQuery>
		<FormQuery.Field name="title" placeholder="Tytuł" icon="lucide:search" />
		<svelte:boundary>
			<FormQuery.ComboBox name="tag" placeholder="Gatunek" options={await tagEnum()} />
			{#snippet pending()}
				<FormQuery.ComboBox name="" placeholder="Gatunek" options={new Enum()} />
			{/snippet}
		</svelte:boundary>
		<Dialog title="Nowa seria">
			{#snippet trigger(showModal)}
				<button onclick={showModal} class="btn self-center btn-secondary"> Nowa seria </button>
			{/snippet}

			<div class="grid grid-cols-[auto_1fr] gap-4">
				<div class="relative aspect-37/53 h-55 overflow-hidden rounded-sm bg-base-300">
					{#if !$cover.data}
						<div class="flex h-full items-center justify-center">
							<Icon icon="lucide:circle-question-mark" class="w-1/2" width="none" />
						</div>
					{:else}
						<img src={$cover.data} alt="" class="absolute inset-0 h-full w-full object-cover" />
					{/if}
				</div>
				<Form {superform} action="?/createSeries" class="">
					<Form.ComboBox
						type="radio"
						field="malId"
						{superform}
						options={$animeArray.data ?? new Enum()}
						bind:filter={title}
						bind:value={selectedAnime}
					/>

					<button class="btn btn-secondary" type="submit">Test</button>
				</Form>
			</div>
		</Dialog>
	</FormQuery>

	<div class="flex flex-wrap gap-4">
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
