<script lang="ts" generics="T extends Record<string, unknown>">
	import Icon from '@iconify/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';

	type Props = HTMLInputAttributes & {
		superform: SuperForm<T>;
		field: FormPathLeaves<T>;
		show?: boolean;
	};

	let { superform, field, show = $bindable(false), ...props }: Props = $props();

	const { value, errors, constraints } = formFieldProxy(superform, field);

	$inspect($errors);
</script>

<label class="floating-label">
	<span>{props.placeholder}</span>
	<label class="validator input w-full">
		<input
			name={field}
			type={show ? 'text' : 'password'}
			bind:value={$value}
			aria-invalid={$errors ? 'true' : undefined}
			{...$constraints}
			{...props}
		/>

		<button type="button" class="label" onclick={() => (show = !show)}>
			{#if show}
				<Icon icon="lucide:eye" />
			{:else}
				<Icon icon="lucide:eye-closed" />
			{/if}
		</button>
	</label>
	{#if $errors}<span class="label text-error">{$errors}</span>{/if}
</label>
