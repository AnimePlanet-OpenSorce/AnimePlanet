<script lang="ts" generics="T extends Record<string, unknown>">
	import { cn } from '$lib/utils/cn';
	import { Enum } from '$lib/utils/enums';
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
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { SvelteMap } from 'svelte/reactivity';
	import { fade } from 'svelte/transition';
	import { arrayProxy, type FormPathArrays, type SuperForm } from 'sveltekit-superforms';

	let {
		options = $bindable(new Enum({})),
		placeholder = 'Dowolny',
		filter = $bindable(''),
		superform,
		field,
		type = 'checkbox',
		value = $bindable([])
	}: {
		options: Enum<string, string>;
		filter?: string;
		superform: SuperForm<T>;
		field: FormPathArrays<T>;
		type?: 'radio' | 'checkbox';
		placeholder?: string;
		value?: string[];
	} = $props();

	const { values: formValue, errors } = arrayProxy(superform, field);

	$effect(() => {
		formValue.set(value as any[]);
	});

	let checkedOptions = $state(new SvelteMap<string, string>());
	const onCheckboxClick = (
		target: MouseEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const value = target.currentTarget.value as string;

		if (type === 'checkbox') {
			if (checkedOptions.has(value)) {
				checkedOptions.delete(value);
			} else {
				checkedOptions.set(value, options.getByKey(value) as string);
			}
		} else {
			checkedOptions.clear();

			checkedOptions.set(value, options.getByKey(value) as string);
		}
	};

	$effect(() => {
		value = checkedOptions.keys().toArray();
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
</script>

<select class="hidden" multiple name={field} bind:value>
	{#each checkedOptions.keys() as key}
		<option value={key} selected={true}>{key}</option>
	{/each}
</select>

<button
	type="button"
	bind:this={floating.elements.reference}
	{...interactions.getReferenceProps()}
	class="input w-full cursor-pointer"
>
	{#if checkedOptions.size > 0}
		<div class={cn('w-full text-start')}>
			{#each checkedOptions.values() as value, i}
				<span>
					{#if i > 0}, &nbsp;
					{/if}{value}
				</span>
			{/each}
		</div>
	{:else}
		<div class={cn('w-full text-start text-[--alpha(var(--color-base-content)_/_50%)]')}>
			Dowolny
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
			{#each options.entries() as [value, body]}
				<label
					class="flex items-center gap-2 rounded-sm px-2 py-1 hover:bg-[--alpha(var(--color-base-content)_/_15%)]"
				>
					<input
						{type}
						class={cn({
							'checkbox checkbox-sm': type === 'checkbox',
							'radio radio-sm': type === 'radio'
						})}
						{value}
						onclick={onCheckboxClick}
						checked={checkedOptions.has(value)}
					/>

					<span>{body}</span>
				</label>
			{/each}
		</div>
	</div>
{/if}
