<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Enum } from '$lib/utils/enums';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import { formFieldProxy, type FormPathLeaves, type SuperForm } from 'sveltekit-superforms';

	type Props = HTMLSelectAttributes & {
		superform: SuperForm<T>;
		field: FormPathLeaves<T>;
		options: Enum<string, string>;
	};

	const { superform, field, options, ...props }: Props = $props();

	const { value, errors, constraints } = formFieldProxy(superform, field);
</script>

<label class="select w-full">
	<span class="label">Typ grupy</span>
	<select
		name={field}
		bind:value={$value}
		aria-invalid={$errors ? 'true' : undefined}
		{...$constraints}
		{...props}
	>
		{#each options.entries() as [value, body]}
			<option {value}>
				{body}
			</option>
		{/each}
	</select>
</label>
