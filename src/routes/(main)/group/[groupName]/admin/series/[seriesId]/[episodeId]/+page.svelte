<script lang="ts">
	import { source } from '$lib/actions/source';
	import Dialog from '$lib/component/Dialog/Dialog.svelte';
	import Episode from '$lib/component/Episode';
	import Form from '$lib/component/Form';
	import Tooltip from '$lib/component/Tooltip/Tooltip.svelte';
	import type { PageProps } from './$types';
	import Icon from '@iconify/svelte';

	let { data, params }: PageProps = $props();

	const source_s = await source.get.many({
		filters: {
			episodeId: data.episode.id
		}
	});

	const notNull = <T,>(data: T): data is NonNullable<T> => !!data;

	const players = source_s.data.map(({ player }) => player).filter(notNull);

	const legacyPlayers = source_s.data.map(({ legacyPlayer }) => legacyPlayer).filter(notNull);
</script>

<div class="flex max-w-4xl flex-col gap-4">
	<Episode {...data.episode} />
	<!-- <Form class="rounded-2xl bg-base-300 p-4">
		<div class="flex gap-4 *:last:w-full">
			<Form.Field placeholder="Numer odcinka" value={data.episode.number} />
			<Form.Field placeholder="Tytuł odcinka" value={data.episode.title} />
		</div>
	</Form> -->
	<table class="table bg-base-300">
		<thead>
			<tr>
				<th>Torrent</th>
				<th>Audio</th>
				<th>Napisy</th>
				<th class="flex justify-end">
					<Dialog>
						{#snippet trigger(showModal)}
							<button onclick={showModal} type="button" class="btn btn-square btn-secondary">
								<Icon icon="lucide:plus" />
							</button>
						{/snippet}
						<Form form={source.create} class="grid grid-cols-[auto_1fr_auto] gap-y-2">
							<Form.Field.Hidden form={source.create} field="playerType" value="player" />
							<Form.Field.Hidden form={source.create} field="episodeId" value={data.episode.id} />
							<Form.Field.Hidden form={source.create} field="group_s[]" value={data.group.id} />

							<Form.Field
								form={source.create}
								field="torrent"
								labelClass="col-span-2"
								placeholder="Torrent"
							/>
							<Tooltip tip="Dozwolone formaty: Info hash, Magnet link" />

							<Form.File
								form={source.create}
								field="audio"
								label="Audio"
								accept="audio/*"
								class="col-span-2 grid-cols-subgrid"
							/>
							<Tooltip tip="Jeśli chcesz dodać opcję z lektorem dodaj tu plik audio." />

							<Form.File
								form={source.create}
								field="subtitles"
								label="Napisy"
								accept=".ass"
								class="col-span-2 grid-cols-subgrid"
							/>
							<Tooltip tip="Jeśli chcesz dodać opcję z napisami dodaj tu plik napisów." />

							<button type="submit" class="btn col-span-full btn-secondary">Stwórz</button>
						</Form>
					</Dialog>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if players.length > 0}
				{#each players as player}
					{@const { torrentUrl, audioUrl, subtitlesUrl } = player}
					<tr>
						<th>{torrentUrl}</th>
						<th><a class="link link-accent" href={audioUrl} target="_blank">{audioUrl}</a></th>
						<th
							><a class="link link-accent" href={subtitlesUrl} target="_blank">{subtitlesUrl}</a
							></th
						>
					</tr>
				{/each}
			{:else}
				<tr>
					<th colspan={5} class="p-4 text-center">Nie masz jeszcze żadnych player'ów</th>
				</tr>
			{/if}
		</tbody>
	</table>

	<table class="table bg-base-300">
		<thead>
			<tr>
				<th>Typ</th>
				<th>URL</th>
				<th class="flex justify-end">
					<button type="button" class="btn btn-square btn-secondary">
						<Icon icon="lucide:plus" />
					</button>
				</th>
			</tr>
		</thead>
		<tbody>
			{#if legacyPlayers.length > 0}
				{#each legacyPlayers as legacyPlayer}
					{@const { type, url } = legacyPlayer}
					<tr>
						<th>{type}</th>
						<th>{url}</th>
					</tr>
				{/each}
			{:else}
				<tr>
					<th colspan={4} class="p-4 text-center"> Nie masz jeszcze żadnych legacyPlayer'ów </th>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
