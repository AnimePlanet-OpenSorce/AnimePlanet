<script lang="ts">
	import { group } from '$lib/actions/group';
	import { cleanObject } from '$lib/actions/shared';
	import { user } from '$lib/actions/user';
	import Dialog from '$lib/component/Dialog/Dialog.svelte';
	import Form from '$lib/component/Form';
	import { Enum, groupTypeEnum } from '$lib/utils/enums';
	import { encodeUrl } from '$lib/utils/url';
	import Icon from '@iconify/svelte';

	let groupName = $state<string>();
	let groupType = $state<ReturnType<typeof groupTypeEnum.keys>[number]>('' as any);

	$inspect(groupType);

	const { data: groups } = $derived(
		await group.get.many({
			filters: cleanObject({
				name: groupName,
				type: groupType
			}),
			options: {
				perPage: 'all'
			}
		})
	);

	let newGroupDialog = $state<HTMLDialogElement>();
</script>

<dir class="max-w-4xl rounded-xl bg-base-300 p-2">
	<table class="table table-zebra">
		<thead>
			<tr>
				<th>
					<input
						bind:value={groupName}
						type="text"
						placeholder="Nazwa grupy"
						class="input max-w-full min-w-0"
					/>
				</th>
				<th>
					<Form.ComboBox options={groupTypeEnum} bind:value={groupType} />
				</th>
				<th class="flex justify-end">
					<a href="./groups/create" class="btn btn-square btn-soft btn-secondary">
						<Icon icon="lucide:plus" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if groups.length > 0}
				{#each groups as { name, type }}
					<tr>
						<td>{name}</td>
						<td>{type}</td>
						<td class="flex justify-end">
							<a href="/group/{encodeUrl(name)}/admin" class="btn btn-square btn-outline">
								<Icon icon="lucide:arrow-up-right" />
							</a>
						</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="10">
						<div class="label flex justify-center p-2">Jeszcze nic tu nie ma.</div>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</dir>
