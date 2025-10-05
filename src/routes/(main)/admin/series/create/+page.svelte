<script lang="ts">
	import anilist from '$lib/actions/api/anilist';
	import { series } from '$lib/actions/series';
	import Cover from '$lib/component/Cover';
	import Dialog from '$lib/component/Dialog/Dialog.svelte';
	import Form from '$lib/component/Form';
	import {
		Enum,
		seriesGenreEnum,
		seriesRelationTypeEnum,
		seriesSeasonEnum,
		seriesTypeEnum
	} from '$lib/utils/enums';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const reset = String((await anilist.search({ title: '' }))[0].malId);
	const search = async () => {
		const { relation_s, ...series } = await anilist.seriesPrototype({
			malId: Number(selectedMal)
		});

		seriesRelation_s = relation_s;
		return series;
	};

	let selectedMal: string = $state(reset);

	let seriesRelation_s: Awaited<ReturnType<typeof anilist.seriesPrototype>>['relation_s'] = $state(
		[]
	);

	let seriesData = $derived(await search());

	let relationDialog_s: HTMLDialogElement[] = $state([]);
</script>

<Form form={series.create} class="flex max-w-2xl flex-col gap-2">
	<!-- Series Data -->
	<div class="collapse-arrow collapse bg-base-300">
		<input type="checkbox" checked />
		<div class="collapse-title font-semibold">Podstawowe dane serii</div>
		<div class="collapse-content">
			<div class="flex gap-4">
				<div>
					<Cover.Prototype series={seriesData} />
				</div>
				<div class=" flex w-full flex-col gap-4">
					<Form.ComboBox
						form={series.create}
						field="malId"
						placeholder="Anilist"
						filterFn={async (filter) => {
							const _data = await anilist.search({ title: filter });
							return new Enum(
								_data.map(({ malId, title }): [string, string] => [String(malId), title])
							);
						}}
						bind:value={selectedMal}
					/>
					<Form.Field
						form={series.create}
						field="title"
						placeholder="Tytuł"
						value={seriesData.title}
					/>
					<Form.ComboBox
						form={series.create}
						field="type"
						placeholder="Typ"
						value={seriesData.type}
						options={seriesTypeEnum}
					/>
					<Form.Field
						form={series.create}
						field="coverUrl"
						placeholder="Okładka"
						value={seriesData.coverUrl}
					/>
					<div class="collapse-arrow collapse bg-base-100">
						<input type="checkbox" checked />
						<div class="text-md collapse-title">Banner</div>

						<div class="collapse-content space-y-2">
							<Form.Field form={series.create} field="bannerUrl" value={seriesData.bannerUrl} />
							<img src={seriesData.bannerUrl} alt="" />
						</div>
					</div>
					<Form.Checkbox form={series.create} field="nsfw" label="NSFW" />
					<Form.Field
						form={series.create}
						field="year"
						placeholder="Data wydania"
						type="date"
						value={seriesData.year.toISOString().split('T')[0]}
					/>
					<Form.ComboBox
						form={series.create}
						field="season"
						placeholder="Sezon"
						value={seriesData.season}
						options={seriesSeasonEnum}
					/>
					<Form.ComboBox
						form={series.create}
						field="genre_s[]"
						placeholder="Gatunki"
						multiple
						value={seriesData.genre_s}
						options={seriesGenreEnum}
					/>
					<div class="collapse-arrow collapse bg-base-100">
						<input type="checkbox" checked />
						<div class="text-md collapse-title">Trailer</div>

						<div class="collapse-content space-y-2">
							<Form.Field form={series.create} field="trailerUrl" value={seriesData.trailerUrl} />
							<!-- TODO: Dodać podgląd trailera -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Series Relations -->
	<div class="collapse-arrow collapse bg-base-300">
		<input type="checkbox" checked />
		<div class="collapse-title font-semibold">Relacje serii</div>
		<div class="collapse-content">
			{#each seriesRelation_s as relation, idx}
				{@const _series = series.get.one({
					filters: {
						id: relation.referenceSeriesId
					}
				})}
				{#if _series.current}
					<div class="flex w-fit flex-col rounded-md bg-base-100 p-4">
						<Cover series={_series.current} />
						<div class="divider m-0"></div>
						<div class="flex flex-col gap-2">
							<p class="m-auto text-center">
								<span class="font-semibold"> Typ relacji: </span>
								<br />
								{seriesRelationTypeEnum.getByKey(relation.relationType)}
							</p>

							<div class="grid grid-cols-2 gap-2">
								<button
									type="button"
									class="btn btn-error"
									onclick={() => {
										seriesRelation_s = seriesRelation_s.filter((v) => {
											v.referenceSeriesId !== relation.referenceSeriesId;
										});
									}}>Usuń</button
								>
								<Dialog bind:dialog={relationDialog_s[idx]}>
									{#snippet trigger(showModel)}
										<button type="button" class="btn btn-secondary" onclick={showModel}>
											Edytuj
										</button>
									{/snippet}
									<Form.ComboBox
										form={series.create}
										field="relation_s[{idx}].referenceSeriesId"
										placeholder="Powiązana seria"
										bind:value={relation.referenceSeriesId}
										filterFn={async (filter) => {
											const _data = await series.get.many({
												filters: {
													title: filter
												},
												options: {
													perPage: 10
												}
											});

											return new Enum(
												_data.data.map(({ id, title }): [string, string] => [id, title])
											);
										}}
									/>
									<Form.ComboBox
										form={series.create}
										field="relation_s[{idx}].relationType"
										placeholder="Typ relacji"
										bind:value={relation.relationType}
										options={seriesRelationTypeEnum}
									/>
									<button
										onclick={() => relationDialog_s[idx].close()}
										type="button"
										class="btn btn-secondary">Zamknij</button
									>
								</Dialog>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
	<div class="flex justify-end">
		<div class="grid grid-cols-2 gap-2">
			<button class="btn btn-secondary" type="submit">Stwórz</button>
			<button class="btn btn-error" type="button" onclick={() => (selectedMal = reset)}>
				Reset
			</button>
		</div>
	</div>
</Form>
