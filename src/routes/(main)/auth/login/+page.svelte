<script lang="ts">
	import Form from '$lib/component/Form';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const superform = superForm(data.form);
</script>

<div class="card-body gap-2 p-6">
	<h2 class="card-title">Witamy ponownie w HoshiAnime</h2>

	<div class="flex h-full flex-col justify-center">
		<Form {superform}>
			<fieldset class="fieldset gap-4">
				<Form.Field {superform} field="login" placeholder="Login" />
				<Form.Field.Secret {superform} field="password" placeholder="Hasło" />
				<div class="grid gap-4 sm:grid-cols-2">
					<button class="btn text-nowrap btn-secondary"> Zaloguj się </button>
					<a href="/auth/register" class="btn text-nowrap btn-neutral"> Zarejestruj się </a>
				</div>
			</fieldset>
		</Form>

		<div class="divider">LUB</div>

		<div class="flex justify-around">
			<div class="tooltip" data-tip="Już wkrótce">
				<a
					href="/"
					class="btn-disabled btn btn-square p-2 btn-neutral"
					role="button"
					aria-disabled="true"
				>
					<Icon icon="simple-icons:discord" width="none" />
				</a>
			</div>
			<div class="tooltip" data-tip="Już wkrótce">
				<a
					href="/"
					class="btn-disabled btn btn-square p-2 btn-neutral"
					role="button"
					aria-disabled="true"
				>
					<Icon icon="simple-icons:google" width="none" />
				</a>
			</div>
			<div class="tooltip" data-tip="Już wkrótce">
				<a
					href="/"
					class="btn-disabled btn btn-square p-2 btn-neutral"
					role="button"
					aria-disabled="true"
				>
					<Icon icon="simple-icons:github" width="none" />
				</a>
			</div>
		</div>
	</div>
</div>
