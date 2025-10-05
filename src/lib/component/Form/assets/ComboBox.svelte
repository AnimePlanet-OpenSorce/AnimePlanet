<script lang="ts" generics="TInput extends RemoteFormInput | void, TOutput,">
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
	import type { RemoteForm, RemoteFormInput, RemoteFormIssue } from '@sveltejs/kit';
	import Fuse from 'fuse.js';
	import { SvelteMap } from 'svelte/reactivity';
	import { fade } from 'svelte/transition';

	type Prettify<T> = {
		[K in keyof T]: T[K];
	} & {};

	type ValueType = string;
	type Props = Prettify<
		(
			| {
					form: RemoteForm<TInput, TOutput>;
					field: ReturnType<RemoteForm<TInput, TOutput>['field']>;
			  }
			| {
					form?: undefined;
					field?: never;
			  }
		) &
			(
				| {
						multiple?: false;
						value?: ValueType | undefined | null;
				  }
				| {
						multiple?: true;
						value?: ValueType[] | undefined | null;
				  }
			) & {
				filter?: string;
				placeholder?: string;
				options?: Enum<string, string>;
				filterFn?: (filter: string, options: Enum<string, string>) => Promise<Enum<string, string>>;
			}
	>;

	let {
		form,
		field,
		multiple = false,
		value = $bindable(multiple ? [] : ''),
		filter = $bindable(''),
		placeholder,
		options = $bindable(new Enum()),
		filterFn = async (filter: string) => {
			return filter.length > 0
				? new Enum(
						Object.fromEntries(fuse.search(filter).map(({ item }) => [item.key, item.value]))
					)
				: options;
		}
	}: Props = $props();

	const fuse = new Fuse(
		options.entries().map(([key, value]) => ({
			key,
			value
		})),
		{
			keys: ['key', 'value']
		}
	);

	const visibleOptions = $derived(await filterFn(filter, options));

	let checkedOptions = $derived.by(() => {
		const _response = new SvelteMap<string, string>();
		const _value = typeof value === 'string' ? [value] : (value ?? []);

		for (const k of _value) {
			const v = visibleOptions.getByKey(k);

			if (v) {
				_response.set(k, v);
			}
		}

		return _response;
	});
	const onCheckboxClick = (
		target: MouseEvent & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const checkboxValue = target.currentTarget.value as string;

		if (multiple) {
			const _value = new Set(typeof value === 'string' ? [value] : value);

			if (_value.has(checkboxValue)) {
				_value.delete(checkboxValue);
			} else {
				_value.add(checkboxValue);
			}

			value = _value.keys().toArray();
		} else {
			value = checkboxValue;
		}
	};

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

	const issues = $derived.by(() => {
		if (form && field) {
			const _issues = form.issues as Record<typeof field, RemoteFormIssue[]>;
			return _issues[field];
		}
	});
</script>

<select name={String(field)} {multiple} class="hidden">
	{#each checkedOptions.keys() as key}
		<option value={key} selected>{key}</option>
	{/each}
</select>

<div class="relative">
	<label class="floating-label">
		<button
			type="button"
			bind:this={floating.elements.reference}
			{...interactions.getReferenceProps()}
			class={cn('input w-full min-w-0 cursor-pointer', {
				'input-error': Array.isArray(issues)
			})}
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
		{#if checkedOptions.size > 0}
			<span>{placeholder}</span>
		{/if}
	</label>
	{#if Array.isArray(issues)}
		<dir class="relative label w-full">
			&nbsp;
			<p class="absolute top-0 w-full truncate">{issues}</p>
		</dir>
	{/if}
	{#if open}
		<div
			bind:this={floating.elements.floating}
			style={floating.floatingStyles}
			{...interactions.getFloatingProps()}
			class=" z-50 flex w-full flex-col rounded-md bg-base-300 p-4 drop-shadow-lg"
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
				<svelte:boundary>
					{#each visibleOptions.keys() as key}
						<label
							class="flex items-center gap-2 rounded-sm px-2 py-1 hover:bg-[--alpha(var(--color-base-content)_/_15%)]"
						>
							<input
								type={multiple ? 'checkbox' : 'radio'}
								class={cn({
									'checkbox checkbox-sm': multiple,
									'radio radio-sm': !multiple
								})}
								value={key}
								onclick={onCheckboxClick}
								checked={checkedOptions.has(key)}
							/>

							<span>{visibleOptions.getByKey(key)}</span>
						</label>
					{/each}
					{#snippet pending()}
						<div></div>
					{/snippet}
				</svelte:boundary>
			</div>
		</div>
	{/if}
</div>
