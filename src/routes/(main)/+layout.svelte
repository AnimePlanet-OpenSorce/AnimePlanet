<script lang="ts">
	import Navbar from '$lib/component/Navbar';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:boundary>
	<div class="grid max-w-svw grid-cols-[auto_1fr]">
		<Navbar />

		<div class="flex min-w-0 flex-col">
			{@render children()}
		</div>
	</div>
	{#snippet pending()}
		<div
			class="absolute top-0 right-0 z-50 flex h-svh w-svw items-center justify-center bg-base-300"
			out:fade={{ duration: 500 }}
		>
			<span class="loading loading-xl loading-spinner"></span>
		</div>
	{/snippet}
</svelte:boundary>
