<script lang="ts">
	import Dialog from '$lib/component/Dialog/Dialog.svelte';
	import Form from '$lib/component/Form';
	import { Enum, groupTypeEnum } from '$lib/utils/enums';
	import { encodeUrl } from '$lib/utils/url';
	import type { PageData } from './$types';
	import { getGroups, getUsers } from './server.remote';
	import Icon from '@iconify/svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const superform = superForm(data.form);

	let groupName = $state(undefined);
	let groupType = $state(undefined);

	const groups = $derived(
		getGroups({
			filters: {
				name: '',
				...(groupType !== undefined && { type: groupType })
			}
		})
	);

	let dialog = $state({} as HTMLDialogElement);

	let filter = $state('');
	let asyncOptions = $derived(
		getUsers({
			filters: {
				username: filter
			}
		})
	);
	let options = $state(new Enum<string, string>({}));

	$effect(() => {
		if (asyncOptions.ready) {
			options = new Enum(asyncOptions.current);
		}
	});
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
					<select bind:value={groupType} class="select">
						<option value={undefined} disabled selected>Typ grupy</option>
						{#each groupTypeEnum.entries() as [value, text]}
							<option {value}>{text}</option>
						{/each}
					</select>
				</th>
				<th class="flex justify-end">
					<Dialog title="Nowa Grupa">
						{#snippet trigger(showModal)}
							<button onclick={showModal} class="btn btn-square btn-soft btn-secondary">
								<Icon icon="lucide:plus" />
							</button>
						{/snippet}
						<Form class="flex flex-col gap-2" action="?/createGroup" {superform}>
							<Form.Field field="name" {superform} placeholder="Nazwa grupy" />
							<Form.Select field="type" {superform} options={groupTypeEnum} />

							<Form.ComboBox field="admin_s" {superform} bind:filter bind:options />
							<button class="btn btn-secondary">Stwórz</button>
						</Form>
					</Dialog>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if groups.ready}
				{#if groups.current.length > 0}
					{#each groups.current as { name, type }}
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
			{/if}
		</tbody>
	</table>
</dir>
