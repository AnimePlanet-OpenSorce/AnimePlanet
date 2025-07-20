<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { superForm, type SuperForm, type SuperValidated } from 'sveltekit-superforms';

	type Props = {
		superform: SuperForm<T>;
	} & HTMLFormAttributes;

	const { superform, children, ...props }: Props = $props();
	const { enhance } = superform;
</script>

<form method="post" {...props} use:enhance>
	{@render children?.()}
</form>
