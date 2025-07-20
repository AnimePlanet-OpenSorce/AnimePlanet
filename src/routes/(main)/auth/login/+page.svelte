<script lang="ts">
	import Form from '$lib/component/Form';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const superform = superForm(data.form);
</script>

<div
	class="card mx-4 my-auto max-h-4/5 max-w-3xl self-center bg-base-300 shadow-sm drop-shadow-xl sm:aspect-16/9 sm:card-side"
>
	<figure class="not-sm:aspect-video sm:max-w-2/5">
		<img src="https://placewaifu.com/image/1080/1920/?blure" alt="Movie" class="" />
	</figure>
	<div class="card-body gap-2 p-6">
		<h2 class="card-title">Witamy ponownie w HoshiAnime</h2>

		<div class="flex h-full flex-col justify-center">
			<Form {superform} class="">
				<fieldset class="fieldset gap-4">
					<Form.Field {superform} field="login" placeholder="Login" />
					<Form.Field {superform} field="password" placeholder="Password" />
					<div class="grid grid-cols-2 gap-4">
						<button class="btn text-nowrap btn-secondary">Zaloguj się</button>
						<a href="/auth/register" class="btn text-nowrap btn-neutral">Zarejestruj się</a>
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
</div>
