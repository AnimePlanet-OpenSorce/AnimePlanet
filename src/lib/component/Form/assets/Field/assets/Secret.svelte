<script lang="ts" generics="TInput extends RemoteFormInput | void, TOutput,">
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import type { RemoteForm, RemoteFormInput, RemoteFormIssue } from '@sveltejs/kit';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Props = {
		form: RemoteForm<TInput, TOutput>;
		field: ReturnType<RemoteForm<TInput, TOutput>['field']>;
	} & {
		labelClass?: string;
		class?: string;
		type?: HTMLInputAttributes['type'];
		placeholder?: string;
		value?: HTMLInputAttributes['value'];
		show?: boolean;
	};

	let {
		form,
		field,
		labelClass,
		class: className,
		type = 'text',
		show = $bindable(false),
		placeholder,
		value = $bindable()
	}: Props = $props();

	const issues = $derived.by(() => {
		const _issues = form.issues as Record<typeof field, RemoteFormIssue[]>;
		return _issues[field];
	});
</script>

<label class={cn('floating-label', labelClass)}>
	<label class={cn('validator input w-full min-w-0', className)}>
		<input
			name={String(field)}
			type={show ? type : 'password'}
			{placeholder}
			aria-invalid={!!issues}
			bind:value
		/>
		<span class="label">
			<button type="button" onclick={() => (show = !show)}>
				{#if show}
					<Icon icon="lucide:eye" />
				{:else}
					<Icon icon="lucide:eye-off" />
				{/if}
			</button>
		</span>
	</label>
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
