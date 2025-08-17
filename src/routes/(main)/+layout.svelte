<script lang="ts">
	import Navbar from '$lib/component/Navbar';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<div class="grid max-w-svw grid-cols-[auto_1fr]">
		<Navbar />

		<div class="flex min-w-0 flex-col">
			{@render children()}
		</div>
	</div>
</QueryClientProvider>
