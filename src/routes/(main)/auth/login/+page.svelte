<script lang="ts">
	import Form from '$lib/component/Form';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const superform = superForm(data.form);
</script>

<svelte:head>
	<title>Logowanie - HoshiAnime</title>
	<meta
		name="description"
		content="Zaloguj się do HoshiAnime, aby korzystać z pełni możliwości naszej platformy."
	/>
</svelte:head>

<div
	class="card m-auto max-h-4/5 w-[calc(100%-2rem)] max-w-3xl self-center bg-base-300 shadow-sm drop-shadow-xl sm:card-side"
>
	<figure class="w-full not-sm:aspect-video sm:max-w-2/6">
		<picture>
			<source
				media="(min-width: 640px)"
				srcset="https://placewaifu.com/image/1080/1920/?blure"
				width="1080"
				height="1920"
			/>
			<img
				src="https://placewaifu.com/image/1920/1080/?blure"
				alt="Anime illustration"
				width="1920"
				height="1080"
				class="h-full w-full"
			/>
		</picture>
	</figure>
	<div class="card-body gap-2 p-6">
		<h2 class="card-title">Witamy ponownie w HoshiAnime</h2>

		<div class="flex h-full flex-col justify-center">
			<Form {superform} class="">
				<fieldset class="fieldset gap-4">
					<Form.Field {superform} field="login" placeholder="Login" type="text" />
					<Form.Field {superform} field="password" placeholder="Password" type="password" />
					<div class="grid gap-4 sm:grid-cols-2">
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
