<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div class="flex w-1/4 max-w-3xs min-w-min flex-col gap-2 font-semibold *:rounded-md *:px-4 *:py-2">
	{@render children?.()}
</div>
