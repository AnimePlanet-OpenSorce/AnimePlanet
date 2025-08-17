<script lang="ts">
	import { getSeries } from '$lib/actions/series.remote';
	import Cover from '$lib/component/Cover/Cover.svelte';
	import FormQuery from '$lib/component/FormQuery';
	import { Enum } from '$lib/utils/enums';
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';

	let { data }: PageProps = $props();

	let seriesArray = $derived.by(() => {
		if (data.group?.id) {
			return getSeries({
				filters: {
					group: [data.group.id],
					title: 'OnePice'
				}
			});
		}
	});
</script>

<div class="flex items-end gap-4">
	<FormQuery>
		<FormQuery.Field title="Tytuł" icon="lucide:search" name="q" />
	</FormQuery>
	<button class=" btn btn-square p-1 btn-secondary">
		<Icon icon="lucide:plus" width="none" />
	</button>
</div>

<div>
	{#each { length: 10 }}
		<!-- <Cover series= /> -->
	{/each}
</div>
