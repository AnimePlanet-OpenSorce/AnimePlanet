<script lang="ts">
	import Form from '$lib/component/Form';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const superform = superForm(data.form);
</script>

<div class="card-body gap-2 p-6">
	<h2 class="card-title">Witamy w HoshiAnime</h2>

	<div class="flex h-full flex-col justify-center">
		<Form {superform} class="">
			<fieldset class="fieldset gap-4">
				<Form.Field {superform} type="email" field="email" placeholder="Email" />
				<Form.Field {superform} field="login" placeholder="Login" />
				<Form.Field.Secret {superform} field="password" placeholder="Hasło" />
				<Form.Field.Secret {superform} field="confirmPassword" placeholder="Powtórz Hasło" />

				<div class="grid gap-4 sm:grid-cols-2">
					<button type="submit" class="btn text-nowrap btn-secondary">Zarejestruj się</button>
					<a href="/auth/login" class="btn text-nowrap btn-neutral">Zaloguj się</a>
				</div>
			</fieldset>
		</Form>
	</div>
</div>
