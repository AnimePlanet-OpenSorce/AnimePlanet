<script lang="ts">
	import { page } from '$app/state';
	import { getSeries, type GetSeriesProps } from '$lib/actions/series.remote';
	import Cover from '../Cover';
	import { onMount } from 'svelte';
	import { ssp } from 'sveltekit-search-params';
	import Swiper from 'swiper';
	import 'swiper/css';

	type Props = {
		listName: string;
	} & GetSeriesProps;
	const { listName, ...options }: Props = $props();

	let seriesArray = $derived(getSeries(options));

	onMount(() => {
		new Swiper('.swiper', {
			slidesPerView: 'auto'
		});
	});

	const getUrl = ({ filters, options }: GetSeriesProps) => {
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
				{#each await seriesArray as series}
					<Cover {series} />
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
