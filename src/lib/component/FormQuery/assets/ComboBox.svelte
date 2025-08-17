<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils/cn';
	import type { Enum } from '$lib/utils/enums';
	import Icon from '@iconify/svelte';
	import {
		arrow,
		autoUpdate,
		flip,
		offset,
		useClick,
		useDismiss,
		useFloating,
		useInteractions,
		useRole
	} from '@skeletonlabs/floating-ui-svelte';
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { SvelteMap } from 'svelte/reactivity';
	import { fade } from 'svelte/transition';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let {
		title = '',
		name,
		options,
		value = $bindable([]),
		placeholder = 'Dowolny'
	}: {
		title?: string;
		name: string;
		options: Enum<string, string>;
		placeholder?: string;
		value?: string[];
	} = $props();

	const paramValue = queryParam(name, {
		encode: (v: string[]) => {
			if (v.length !== 0) return ssp.array().encode(v);

			return undefined;
		},
		decode: (v): string[] | null => ssp.array().decode(v)
	});

	$effect(() => {
		paramValue.set(value);
	});

	let checkedOptions = $state(new SvelteMap<string, string>());
	const onCheckboxClick = (
		target: MouseEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const value = target.currentTarget.value as string;

		if (checkedOptions.has(value)) {
			checkedOptions.delete(value);
		} else {
			checkedOptions.set(value, options.getByKey(value) as string);
		}
	};

	onMount(() => {
		ssp
			.array()
			.decode(page.url.searchParams.get(name))
			?.forEach((key) => {
				const value = options.getByKey(key);
				if (value) {
					checkedOptions.set(key, value);
				}
			});
	});

	$effect(() => {
		value = checkedOptions.keys().toArray() as any[];
	});

	// State
	let open = $state(false);
	let elemArrow: HTMLElement | null = $state(null);

	// Use Floating
	const floating = useFloating({
		whileElementsMounted: autoUpdate,
		get open() {
			return open;
		},
		onOpenChange: (v) => {
			open = v;
		},
		placement: 'bottom',
		get middleware() {
			return [offset(10), flip(), elemArrow && arrow({ element: elemArrow })];
		}
	});

	// Interactions
	const role = useRole(floating.context);
	const click = useClick(floating.context);
	const dismiss = useDismiss(floating.context);
	const interactions = useInteractions([role, click, dismiss]);

	let filter: string = $state('');

	const fuse = new Fuse(
		options.entries().map(([key, value]) => ({
			key,
			value
		})),
		{
			keys: ['key', 'value']
		}
	);

	let filterOptions = $derived.by(() => {
		if (filter) {
			return fuse.search(filter).map((v) => v.item);
		} else {
			return options.entries().map(([key, value]) => ({
				key,
				value
			}));
		}
	});
</script>

<div class="relative flex w-full flex-col gap-1">
	<h3 class="text-2xl font-bold">{title}</h3>
	<button
		bind:this={floating.elements.reference}
		{...interactions.getReferenceProps()}
		class="input w-full min-w-0 cursor-pointer"
	>
		{#if checkedOptions.size > 0}
			<div class={cn('w-full truncate text-start')}>
				{#each checkedOptions.values() as value, i}
					<span class="contents">
						{#if i > 0}, &nbsp;
						{/if}{value}
					</span>
				{/each}
			</div>
		{:else}
			<div class={cn('w-full text-start text-[--alpha(var(--color-base-content)_/_50%)]')}>
				{placeholder}
			</div>
		{/if}
		<span class="label">
			<Icon icon="lucide:arrow-up-down" class="inline text-lg" />
		</span>
	</button>
	{#if open}
		<div
			bind:this={floating.elements.floating}
			style={floating.floatingStyles}
			{...interactions.getFloatingProps()}
			class=" z-50 flex w-full flex-col rounded-md bg-base-300 p-4"
			transition:fade={{ duration: 200 }}
		>
			<label class="input input-sm w-full input-ghost">
				<span class="label">
					<Icon icon="lucide:search" class="inline text-lg" />
				</span>
				<input type="text" bind:value={filter} />
			</label>

			<div class="divider m-0"></div>

			<div class="flex max-h-40 flex-col overflow-y-scroll">
				{#each filterOptions as { key, value }}
					<label
						class="flex items-center gap-2 rounded-sm px-2 py-1 hover:bg-[--alpha(var(--color-base-content)_/_15%)]"
					>
						<input
							type="checkbox"
							class="checkbox checkbox-sm"
							value={key}
							onclick={onCheckboxClick}
							checked={checkedOptions.has(key)}
						/>

						<span>{value}</span>
					</label>
				{/each}
			</div>
		</div>
	{/if}
</div>
