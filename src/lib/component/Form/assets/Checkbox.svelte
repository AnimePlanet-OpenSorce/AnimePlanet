<script lang="ts" generics="TInput extends RemoteFormInput | void, TOutput,">
	import type { RemoteForm, RemoteFormInput, RemoteFormIssue } from '@sveltejs/kit';

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
		checked?: boolean;
		label: string;
	};

	let { form, field, checked = $bindable(false), label }: Props = $props();

	const issues = $derived.by(() => {
		if (form && field) {
			const _issues = form.issues as Record<typeof field, RemoteFormIssue[]>;
			return _issues[field];
		}
	});
</script>

<label class="label">
	<input type="checkbox" class="checkbox" bind:checked aria-invalid={!!issues} />
	- {label}
</label>
<input
	class="hidden"
	type="checkbox"
	name={String(field)}
	checked
	value={checked ? 'true' : 'false'}
/>
