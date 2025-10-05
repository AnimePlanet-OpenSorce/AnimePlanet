<script lang="ts">
	import { page } from '$app/state';
	import { episode } from '$lib/actions/episode';
	import Dialog from '$lib/component/Dialog/Dialog.svelte';
	import Episode from '$lib/component/Episode';
	import Form from '$lib/component/Form';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let episode_s = episode.get.many({
		filters: {
			seriesId: data.series.id
		},
		options: {
			perPage: 10_000
		}
	});

	let delateDialog_s: HTMLDialogElement[] = [];
	let editDialog_s: HTMLDialogElement[] = [];
</script>

<div class="max-w-2xl">
	<div class="collapse-arrow collapse bg-base-300">
		<input type="checkbox" name="_" checked />
		<div class="collapse-title font-semibold">Odcinki</div>
		<div class="collapse-content">
			<div class="flex flex-col gap-4">
				{#each (await episode_s).data as _episode, i}
					<div class="flex flex-col gap-2 rounded-lg bg-base-200 p-4">
						<Episode {..._episode} />
						<div class="ml-auto grid grid-cols-2 gap-2">
							<Dialog bind:dialog={delateDialog_s[i]} title="Czy jesteś pewien">
								{#snippet trigger(showModel)}
									<button onclick={showModel} class="btn btn-error" type="button">Usuń</button>
								{/snippet}
								<div class=" flex flex-col items-center justify-center">
									<h2 class="text-2xl font-bold">‼️ Uwaga ‼️</h2>
									<p>Tej akcji nie można cofnąć.</p>
								</div>
								<button
									onclick={async () => {
										await episode.delate({ episodeId: _episode.id }).updates(episode_s);
										delateDialog_s[i].close();
									}}
									class="btn btn-error"
									type="button">Usuń</button
								>
							</Dialog>
							<Dialog bind:dialog={editDialog_s[i]} title="Edytor">
								{#snippet trigger(showModal)}
									<button onclick={showModal} class="btn btn-secondary" type="button">
										Edytuj
									</button>
								{/snippet}

								<Form
									{...episode.edit.one.enhance(async ({ form, submit }) => {
										// try()
									})}
								>
									<div class="grid grid-cols-2 gap-4 rounded-md bg-base-300 p-4">
										<Form.Field
											form={episode.edit.one}
											field="number"
											placeholder="Numer odcinka"
											bind:value={_episode.number}
										/>
										<Form.Field
											form={episode.edit.one}
											field="title"
											placeholder="Tytuł odcinka"
											bind:value={_episode.title}
										/>

										<div class="col-span-full">
											<Form.Field
												form={episode.edit.one}
												field="coverUrl"
												placeholder="Okładka odcinka"
												bind:value={_episode.coverUrl}
											/>
										</div>

										<Form.Field
											form={episode.edit.one}
											field="duration"
											placeholder="Długość odcinka"
											bind:value={_episode.duration}
										/>
										<Form.Field
											form={episode.edit.one}
											field="malId"
											placeholder="MAL ID odcinka"
											bind:value={_episode.malId}
										/>

										<!-- <label class="floating-label col-span-full w-full">
											<textarea
												placeholder="Opis odcinka"
												bind:value={_episode.description}
												class="textarea w-full"
											></textarea>
											<span>Opis odcinka</span>
										</label> -->
									</div>
									<div class="ml-auto grid grid-cols-2 gap-2">
										<button
											onclick={() => editDialog_s[i].close()}
											class="btn btn-error"
											type="button">Zamknij</button
										>
										<button class="btn btn-secondary" type="submit">Zapisz</button>
									</div>
								</Form>
							</Dialog>
						</div>
					</div>
				{/each}
				<a href="{page.url.href}/addEpisode" class="btn btn-secondary">Utwórz nowy</a>
			</div>
		</div>
	</div>
</div>
