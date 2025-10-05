<script lang="ts" generics="TInput extends RemoteFormInput | void, TOutput,">
	import { cn } from '$lib/utils/cn';
	import type { RemoteForm, RemoteFormInput, RemoteFormIssue } from '@sveltejs/kit';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = (
		| {
				form: RemoteForm<TInput, TOutput>;
				field: ReturnType<RemoteForm<TInput, TOutput>['field']>;
		  }
		| {
				form?: undefined;
				field?: never;
		  }
	) & {
		labelClass?: string;
		class?: string;
		type?: HTMLInputAttributes['type'];
		placeholder?: string;
		value?: HTMLInputAttributes['value'];
	};

	let {
		form,
		field,
		labelClass,
		class: className,
		type = 'text',
		placeholder,
		value = $bindable()
	}: Props = $props();

	const issues = $derived.by(() => {
		if (form && field) {
			const _issues = form.issues as Record<typeof field, RemoteFormIssue[]>;
			return _issues[field];
		}
	});
</script>

<label class={cn('floating-label', labelClass)}>
	<input
		name={String(field)}
		class={cn('validator input w-full min-w-0', className)}
		{type}
		{placeholder}
		aria-invalid={!!issues}
		bind:value
	/>
	<span>
		{placeholder}
	</span>
	{#if issues}
		<ul class="pl-2">
			{#each issues as issue}
				<li>
					<div aria-label="error" class="status status-error"></div>
					<span class="label text-wrap">
						{issue.message.replace(issue.name, '')}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</label>
