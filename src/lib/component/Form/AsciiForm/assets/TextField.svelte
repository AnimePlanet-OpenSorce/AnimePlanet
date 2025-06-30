<script lang="ts" generics="T extends Record<string, unknown>">
	import AsciiBorder, {
		type Props as AsciiBorderProps
	} from '$lib/component/Ascii/AsciiBorder/AsciiBorder.svelte';
	import { cn } from '$lib/utility/cn';
	import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';
	import { formFieldProxy, type SuperForm, type FormPathLeaves } from 'sveltekit-superforms';

	type Props = HTMLInputAttributes & {
		superform: SuperForm<T>;
		field: FormPathLeaves<T>;
	} & Omit<AsciiBorderProps, 'children' | 'class'>;

	let { superform, field, topLeft, topRight, bottomLeft, bottomRight, ...rest }: Props = $props();

	const { value, errors, constraints } = formFieldProxy(superform, field);
</script>

<AsciiBorder {topLeft} {topRight} {bottomLeft} {bottomRight} class={cn({ 'text-danger': $errors })}>
	<input
		class="outline-none w-full h-full px-2"
		type="text"
		name={field}
		aria-invalid={$errors ? 'true' : undefined}
		bind:value={$value}
		{...$constraints}
		{...rest}
	/>
</AsciiBorder>
