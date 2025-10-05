<script lang="ts" generics="TInput extends RemoteFormInput | void, TOutput,">
	import { cn } from '$lib/utils/cn';
	import type { RemoteForm, RemoteFormInput, RemoteFormIssue } from '@sveltejs/kit';

	type Props = {
		form: RemoteForm<TInput, TOutput>;
		field: ReturnType<RemoteForm<TInput, TOutput>['field']>;
	} & {
		labelClass?: string;
		class?: string;
		placeholder?: string;
		value?: string | null;
	};

	let {
		form,
		field,
		labelClass,
		class: className,
		placeholder,
		value = $bindable()
	}: Props = $props();

	const issues = $derived.by(() => {
		const _issues = form.issues as Record<typeof field, RemoteFormIssue[]>;
		return _issues[field];
	});
</script>

<label class={cn('floating-label', labelClass)}>
	<textarea
		name={String(field)}
		class={cn('validator textarea w-full min-w-0', className)}
		{placeholder}
		aria-invalid={!!issues}
		bind:value
	>
	</textarea>
	<span>
		{placeholder}
	</span>
	{#if issues}
		<ul class="pl-2">
			{#each issues as issue}
				<li>
					<div aria-label="error" class="status status-error"></div>
					<span class="label">
						{issue.message.replace(issue.name, '')}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</label>
