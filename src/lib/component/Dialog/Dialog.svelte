<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	let {
		dialog = $bindable(),
		title = '',
		trigger,
		children,
		classBox
	}: {
		dialog?: HTMLDialogElement;
		title?: string;
		trigger?: Snippet<[showModal: HTMLDialogElement['showModal']]>;
		children?: Snippet;
		classBox?: string;
	} = $props();
</script>

{@render trigger?.(() => dialog?.showModal())}

<dialog class="modal" bind:this={dialog}>
	<div class={cn('modal-box overflow-visible', classBox)}>
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">
				<Icon icon="lucide:x" />
			</button>
		</form>
		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-bold">{title}</h3>
			{@render children?.()}
		</div>
	</div>
</dialog>
