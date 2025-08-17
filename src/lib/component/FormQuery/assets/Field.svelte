<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let {
		title = '',
		icon,
		name,
		placeholder = 'Dowolny',
		value = $bindable(''),
		...props
	}: {
		icon: string;
		name: string;
		title?: string;
		placeholder?: string;
		value?: string;
	} & Omit<HTMLInputAttributes, 'value'> = $props();

	$effect(() => {
		paramValue.set(value);
	});

	onMount(() => {
		value = $paramValue ?? '';
	});

	const paramValue = queryParam(name, {
		encode: (v: string) => {
			if (v.length !== 0) return ssp.string().encode(v);

			return undefined;
		},
		decode: (v): string | null => ssp.string().decode(v)
	});
</script>

<div class="flex w-full flex-col gap-1">
	<h3 class="text-2xl font-bold">{title}</h3>
	<label class="input w-full">
		<span class="label">
			<Icon {icon} class="inline text-lg" />
		</span>
		<input type="text" {name} {placeholder} {...props} bind:value />
	</label>
</div>
