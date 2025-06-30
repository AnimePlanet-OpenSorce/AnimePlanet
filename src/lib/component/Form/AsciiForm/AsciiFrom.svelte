<script lang="ts" generics="T extends Record<string, unknown>">
	import { cn } from '$lib/utility/cn';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import type { SuperForm } from 'sveltekit-superforms';

	const { children, superform, ...props }: HTMLFormAttributes & { superform: SuperForm<T> } =
		$props();
</script>

<form method="POST" {...props} use:superform.enhance>
	{@render children?.()}
</form>
