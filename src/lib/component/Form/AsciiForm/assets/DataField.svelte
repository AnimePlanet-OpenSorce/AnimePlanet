<script lang="ts" generics="T extends Record<string, unknown>">
	import AsciiBorder, {
		type Props as AsciiBorderProps
	} from '$lib/component/Ascii/AsciiBorder/AsciiBorder.svelte';
	import { cn } from '$lib/utility/cn';
	import { createDateField, melt } from '@melt-ui/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	type Props = HTMLInputAttributes & {
		superform: SuperForm<T>;
		field: FormPathLeaves<T>;
	} & Omit<AsciiBorderProps, 'children' | 'class'>;

	let { superform, field, topLeft, topRight, bottomLeft, bottomRight, ...rest }: Props = $props();

	const { value, errors, constraints } = formFieldProxy(superform, field);

	const {
		elements: { field: meltField, segment, label, hiddenInput },
		states: { segmentContents, value: meltValue }
	} = createDateField({
		locale: 'pl-PL',
		name: field
	});
</script>

<AsciiBorder {topRight} {bottomLeft} {bottomRight} class={cn({ 'text-danger': $errors })}>
	{#snippet topLeft()}
		<span use:melt={$label} class="text-text-muted ml-1">Age</span>
		{@render topLeft?.()}
	{/snippet}

	<div use:melt={$meltField} class="flex mx-2">
		{#each $segmentContents as seg, i (i)}
			<div use:melt={$segment(seg.part)}>
				{seg.value}
			</div>
		{/each}
		<input use:melt={$hiddenInput} />
	</div>
</AsciiBorder>
