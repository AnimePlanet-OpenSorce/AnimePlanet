<script lang="ts" generics="TInput extends RemoteFormInput | void, TOutput,">
	import { cn } from '$lib/utils/cn';
	import type { RemoteForm, RemoteFormInput, RemoteFormIssue } from '@sveltejs/kit';
	import type { Snippet } from 'svelte';

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
		accept: string;
		label: Snippet | string;
		class?: string;
	};

	const { form, field, accept, label, class: className }: Props = $props();

	const issues = $derived.by(() => {
		if (form && field) {
			const _issues = form.issues as Record<typeof field, RemoteFormIssue[]>;
			return _issues[field];
		}
	});
</script>

<label class={cn('grid grid-cols-[auto_1fr]', className)}>
	<span class="label pr-2">
		{#if typeof label === 'string'}
			{label}
		{:else}
			{@render label()}
		{/if}
	</span>
	<input
		name={String(field)}
		type="file"
		{accept}
		class="validator file-input w-full"
		aria-invalid={!!issues}
	/>
	{#if issues}
		<ul class="col-start-2 row-start-2 pl-2">
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
