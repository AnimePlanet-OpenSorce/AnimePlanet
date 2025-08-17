<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex w-full not-md:flex-wrap md:gap-6">
	{@render children()}
</div>
