<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { Facebook, Instagram } from 'lucide-svelte';

	let { onclick }: { onclick?: () => void } = $props();
</script>

<nav class="flex flex-col justify-end gap-4 md:flex-row md:items-center">
	<div class="hidden md:contents">
		<a href="https://www.facebook.com/WithLoveToAnime">
			<Facebook />
		</a>
		<a href="https://www.instagram.com/animenistarofkirito/">
			<Instagram />
		</a>
		<a href="https://discord.gg/4qYWVq6B6y">
			<!-- Discord Icon -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.3 18.3 0 0 0-5.487 0a13 13 0 0 0-.617-1.25a.08.08 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.1.1 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.08.08 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.08.08 0 0 0 .084-.028a14 14 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13 13 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10 10 0 0 0 .372-.292a.07.07 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .078.01q.181.149.373.292a.077.077 0 0 1-.006.127a12.3 12.3 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.08.08 0 0 0 .084.028a19.8 19.8 0 0 0 6.002-3.03a.08.08 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03M8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418m7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418"
				/>
			</svg>
		</a>
		<a href="https://x.com/animeni_pl">
			<!-- X Icon -->
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path
					fill="currentColor"
					d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
				/>
			</svg>
		</a>
	</div>
	<button {onclick} class="md:w-fit">
		{#if !!page.data.user}
			<form method="post" action="/auth?/logout" use:enhance>
				<input type="submit" class="btn w-full preset-filled" value="Wyloguj się" />
			</form>
		{:else}
			<a href="/auth" class="btn w-full preset-filled"> Zaloguj się </a>
		{/if}
	</button>

	{#if page.data.user?.admin}
		<a href="/admin" class="btn preset-tonal">Admin Panel</a>
	{/if}
</nav>
