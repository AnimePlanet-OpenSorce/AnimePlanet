<script lang="ts">
	import { page } from '$app/state';
	import { series } from '$lib/actions/series';
	import Cover from '../Cover';
	import { onMount } from 'svelte';
	import { ssp } from 'sveltekit-search-params';
	import Swiper from 'swiper';
	import 'swiper/css';

	type seriesParams = Parameters<typeof series.get.many>[0];

	type Props = {
		listName: string;
	} & seriesParams;
	const { listName, ...options }: Props = $props();

	let { data: seriesArray, pagination } = $derived(await series.get.many(options));

	onMount(() => {
		new Swiper('.swiper', {
			slidesPerView: 'auto'
		});
	});

	const getUrl = ({ filters, options }: seriesParams) => {
		const url = new URL(page.url.origin + '/search');

		if (filters || options)
			Object.entries({ ...filters, ...options }).forEach(([key, v]) => {
				const value = Array.isArray(v) ? ssp.array().encode(v) : v.toString();

				url.searchParams.set(key, value ?? '');
			});

		return url;
	};
</script>

<div>
	<a
		href={getUrl(options).toString()}
		class="mr-6 mb-4 flex items-end justify-between opacity-70 transition-opacity duration-100 hover:opacity-100"
	>
		<h1 class="text-xl">{listName}</h1>

		<span class="text-xs">Pokaż więcej</span>
	</a>

	<div class="swiper w-full">
		<div class="swiper-wrapper">
			<svelte:boundary>
				{#each seriesArray as series}
					<div class="swiper-slide mr-6 max-w-max">
						<Cover {series} />
					</div>
				{/each}

				{#snippet pending()}
					{#each { length: 20 }}
						<div class="swiper-slide mr-6 max-w-max">
							<Cover.Preview />
						</div>
					{/each}
				{/snippet}
			</svelte:boundary>
		</div>
	</div>
</div>

<style>
	.swiper {
		overflow: hidden !important;
	}
</style>
