<script lang="ts">
	import Navbar from '$lib/component/Navbar';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="grid grid-cols-[auto_1fr]">
	<Navbar />

	<div class="flex flex-col">
		{@render children()}
	</div>
</div>
