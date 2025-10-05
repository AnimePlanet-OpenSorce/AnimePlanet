<script lang="ts">
	import { group } from '$lib/actions/group';
	import Form from '$lib/component/Form';
	import Tooltip from '$lib/component/Tooltip';
	import { groupTypeEnum } from '$lib/utils/enums';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Form form={group.create} class="flex max-w-2xl flex-col gap-2">
	<div class="collapse-arrow collapse bg-base-300">
		<input type="checkbox" checked />
		<div class="collapse-title font-semibold">Podstawowe dane grupy:</div>
		<div class="collapse-content">
			<div class="fieldset">
				<Form.Field form={group.create} field="name" placeholder="Nazwa grupy" />
				<Form.ComboBox
					form={group.create}
					field="type"
					options={groupTypeEnum}
					placeholder="Typ grupy"
				/>
				<div class="grid grid-cols-[1fr_auto] gap-2 rounded-md bg-base-100 p-2">
					<!-- TODO: Zamienić to na dodawanie pliku. -->
					<Form.Field form={group.create} field="logoUrl" placeholder="Logo Url" />
					<Tooltip tip="TODO: Zamienić to na dodawanie pliku." />

					<Form.Field form={group.create} field="bannerUrl" placeholder="Banner Url" />
					<Tooltip tip="TODO: Zamienić to na dodawanie pliku." />
				</div>
				<Form.Textarea form={group.create} field="description" placeholder="Opis" />
			</div>
		</div>
	</div>
	<button type="submit" class="btn btn-secondary">Stwórz</button>
</Form>
