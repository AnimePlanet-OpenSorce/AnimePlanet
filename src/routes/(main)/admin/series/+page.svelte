<script lang="ts">
	import { series } from '$lib/actions/series';
	import { cleanObject } from '$lib/actions/shared';
	import Cover from '$lib/component/Cover';
	import Form from '$lib/component/Form';
	import '$lib/utils/enums';
	import { Enum, seriesGenreEnum } from '$lib/utils/enums';

	let title = $state('');
	let tags = $state([]);
	let seriesArray = $derived(
		series.get.many({
			filters: cleanObject({
				title,
				tag: tags
			})
		})
	);
</script>

<div class="flex flex-col gap-4">
	<Form class="grid grid-cols-[1fr_1fr_auto]">
		<Form.Field placeholder="Tytuł" bind:value={title} />
		<svelte:boundary>
			<Form.ComboBox placeholder="Gatunek" multiple options={seriesGenreEnum} bind:value={tags} />
			{#snippet pending()}
				<Form.ComboBox placeholder="Gatunek" options={new Enum()} />
			{/snippet}
		</svelte:boundary>
		<a href="./series/create" class="btn btn-secondary"> Nowa seria</a>
	</Form>

	<div class="flex flex-wrap gap-4">
		{#if seriesArray.ready}
			{#each seriesArray.current.data as series}
				<Cover href="./series/{series.id}" {series} />
			{/each}
		{:else if seriesArray.loading}
			{#each { length: 50 }}
				<Cover.Preview />
			{/each}
		{/if}
	</div>
</div>
