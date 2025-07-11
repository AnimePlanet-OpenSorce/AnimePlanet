<script lang="ts">
	import { urlToHosting } from '$lib/utils/urlToHosting';
	import type { PageData } from './$types';
	import { Modal } from '@skeletonlabs/skeleton-svelte';

	let { data }: { data: PageData } = $props();

	const { episodeNumber, title } = $derived(data.episode);

	let videoUrl = $state(data.episode.videos[0]?.url ?? '');
	let downloadUrl = $state(data.episode.downloads[0]?.url ?? '');

	$effect(() => {
		if (data.episode.videos[0]?.url) videoUrl = data.episode.videos[0]?.url ?? '';
		if (!data.episode.videos[0]?.url) videoUrl = '';
	});

	let nav = $derived([
		{ url: (episodeNumber - 1).toString(), text: 'Poprzedni', active: data.previousEpisode },
		{ url: './#Episodes', text: 'Lista', active: true },
		{ url: (episodeNumber + 1).toString(), text: 'Następny', active: data.nextEpisode }
	]);

	let downloadOS = $state({
		value: false,
		close: () => {
			downloadOS.value = !downloadOS.value;
		}
	});
</script>

<div class="flex h-full flex-col gap-4">
	<div class="bg-error-300-700 flex flex-col items-center font-bold">
		<h1 class="h3">!! Uwaga !!</h1>

		<p class="text-2xl">
			Napotkałeś limit na mega zobacz co można z tym zrobić. <a
				class="btn preset-tonal-error my-2"
				href="/mega-help">kliknij w link</a
			>
		</p>
	</div>

	<h1 class="h5 font-semibold">
		Oglądasz: <a href="./" class="anchor font-normal">{data.anime?.title}</a>
	</h1>

	<div class="grid gap-4 md:grid-cols-[3fr_1fr]">
		{#if videoUrl}
			<iframe
				title="player"
				src={videoUrl}
				class="aspect-video w-full"
				style="border:none;"
				frameBorder="0"
				scrolling="no"
				allowfullscreen
				name="v2"
				allow="encrypted-media"
			></iframe>
		{:else}
			<div class="flex aspect-video bg-surface-900">
				<div class="m-auto text-center">
					<h1 class="h1">{404}</h1>
					<h2 class="text-3xl">Odcinek nie został jeszcze dodany.</h2>
				</div>
			</div>
		{/if}
		<div class="grid grid-rows-[auto_1fr] gap-4">
			<div class="flex h-20 overflow-hidden preset-tonal">
				<div class="h2 flex aspect-square items-center justify-center bg-primary-800 font-bold">
					{episodeNumber}
				</div>
				<h3 class="truncate px-2 py-3">{title}</h3>
			</div>

			<div class="h5 px-2 space-y-2">
				<div class="flex items-center justify-between">
					<h4 class="font-semibold">Serwis:</h4>

					<!-- <button class="anchor font-normal">Wybierz inny</button> -->
					<select class="select max-w-40 font-normal" bind:value={videoUrl}>
						{#each data.episode.videos as { url }}
							<option value={url}>{urlToHosting(url)}</option>
						{/each}
					</select>
				</div>
				<div class="flex items-center justify-between">
					<h4 class="font-semibold">Download:</h4>
					<Modal
						bind:open={downloadOS.value}
						triggerBase="btn preset-tonal"
						contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl w-md  w-[90%] max-w-screen-md"
						backdropClasses="backdrop-blur-sm"
					>
						{#snippet trigger()}
							Download
						{/snippet}
						{#snippet content()}
							<header class="flex justify-between">
								<h2 class="h2">Download</h2>
							</header>
							<div class="space-y-4">
								<select class="select font-normal" bind:value={downloadUrl}>
									{#each data.episode.downloads as { url }}
										<option value={url}>{urlToHosting(url)}</option>
									{/each}
								</select>
								<div class="flex justify-end space-x-4">
									<button onclick={downloadOS.close} class="btn preset-tonal"> Close </button>
									<a class="btn preset-filled" href={downloadUrl} target="_blank"> Download </a>
								</div>
							</div>
						{/snippet}
					</Modal>
				</div>
			</div>
			<div class="grid grid-flow-col justify-items-stretch gap-1">
				{#each nav as { url, text, active }}
					<a
						class={[
							'btn btn-lg p-2 preset-tonal',
							!active ? 'brightness-50 hover:brightness-50' : ''
						]}
						href={active ? url : ''}>{text}</a
					>
				{/each}
			</div>
		</div>
	</div>
</div>
