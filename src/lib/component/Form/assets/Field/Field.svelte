<script lang="ts" generics="T extends Record<string, unknown>">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';

	type Props = HTMLInputAttributes & {
		superform: SuperForm<T>;
		field: FormPathLeaves<T>;
	};

	const { superform, field, type = 'text', ...props }: Props = $props();

	const { value, errors, constraints } = formFieldProxy(superform, field);
</script>

<label class="floating-label">
	<span>{props.placeholder}</span>
	<input
		class="validator input w-full"
		name={field}
		{type}
		bind:value={$value}
		aria-invalid={$errors ? 'true' : undefined}
		{...$constraints}
		{...props}
	/>
	{#if $errors}<span class="label text-error">{$errors}</span>{/if}
</label>
