<script lang="ts" generics="TInput extends RemoteFormInput | void, TOutput,">
	import type { RemoteFormInput, RemoteForm } from '@sveltejs/kit';

	type Props = {
		form: RemoteForm<TInput, TOutput>;
		field: ReturnType<RemoteForm<TInput, TOutput>['field']>;
	} & {
		value: string;
	};

	const { field, value }: Props = $props();
</script>

<input defaultValue={value} name={String(field)} type="text" class="hidden" />
