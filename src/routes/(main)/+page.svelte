<script lang="ts">
	import Hero from '$lib/component/Hero/Hero.svelte';
	import SeriesList from '$lib/component/SeriesList/SeriesList.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex h-full min-w-0 flex-col gap-6">
	<Hero />

	{#each { length: 10 }}
		<SeriesList listName="Popular This Season" filters={{ year: ['2025'] }} />
	{/each}
</div>
