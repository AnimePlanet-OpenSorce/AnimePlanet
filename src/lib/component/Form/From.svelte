<script lang="ts" generics="TInput extends RemoteFormInput | void, TOutput">
	import type { RemoteForm, RemoteFormInput, RemoteFormIssue } from '@sveltejs/kit';
	import type { HTMLFormAttributes } from 'svelte/elements';

	type Props = HTMLFormAttributes &
		(
			| {
					form: RemoteForm<TInput, TOutput>;
					enhance?: Parameters<RemoteForm<TInput, TOutput>['enhance']>[0];
			  }
			| { form?: never; enhance?: never }
		);

	let {
		children,
		form,
		enhance = async ({ submit, form: formElement }) => {
			try {
				await submit();
			} finally {
				if (!form?.issues) {
					formElement.reset();
				}
			}
		},
		...formProps
	}: Props = $props();

	if (!!form?.action && !!form?.issues) {
		$inspect(`Form "${form.action.split('%2F').at(-1)}":`, form.issues);
	}
</script>

<form
	{...formProps}
	{...form?.enhance(enhance)}
	enctype="multipart/form-data"
	oninput={() => form?.validate()}
>
	{@render children?.()}
</form>
