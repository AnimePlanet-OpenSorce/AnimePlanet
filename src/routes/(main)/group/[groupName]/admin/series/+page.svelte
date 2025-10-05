<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { series } from '$lib/actions/series';
	import { seriesToGroup } from '$lib/actions/seriesToGroup';
	import { cleanObject } from '$lib/actions/shared';
	import Cover from '$lib/component/Cover/Cover.svelte';
	import Dialog from '$lib/component/Dialog/Dialog.svelte';
	import Form from '$lib/component/Form';
	import { Enum, seriesStatusEnum } from '$lib/utils/enums';
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';

	let { data }: PageProps = $props();

	let seriesArray = $derived(
		await series.get.many({
			filters: cleanObject({
				group: [data.group.id],
				title: undefined
			})
		})
	);
</script>

<div class="flex flex-col gap-4">
	<div class="grid grid-cols-[1fr_auto] gap-4">
		<Form.Field placeholder="Tytuł" class="w-full" />
		<Dialog>
			{#snippet trigger(showModal)}
				<button onclick={showModal} class="btn btn-square btn-secondary" type="button">
					<Icon icon="lucide:plus" width="none" class="w-1/2" />
				</button>
			{/snippet}

			<Form form={seriesToGroup.create}>
				<Form.Field
					form={seriesToGroup.create}
					field="groupId"
					value={data.group?.id}
					class="!hidden"
				/>
				<Form.ComboBox
					form={seriesToGroup.create}
					field="seriesId"
					placeholder="Tytuł serii"
					filterFn={async (filter) => {
						const { data } = await series.get.many({
							filters: {
								title: filter
							}
						});
						return new Enum(data.map(({ id, title }): [string, string] => [id, title]));
					}}
				/>
				<Form.ComboBox
					form={seriesToGroup.create}
					field="status"
					placeholder="Stan serii"
					options={seriesStatusEnum}
				/>
				<button class="btn btn-secondary" type="submit">Dodaj</button>
			</Form>
		</Dialog>
	</div>

	<div class="flex flex-wrap gap-4">
		{#each seriesArray.data as series}
			<Cover href="./series/{series.id}" {series} />
		{/each}
	</div>
</div>
