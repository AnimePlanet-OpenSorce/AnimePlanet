<script lang="ts">
	import { cn } from '$lib/utility/cn';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		title: string;
		icon?: string;
		windowClass?: string;
		contentClass?: string;
		children?: Snippet;
	};

	const { title, icon = "lucide:terminal", windowClass, contentClass, children }: Props = $props();
</script>

<div
	class={cn(
		'border rounded w-9/10 max-w-2xl flex flex-col items-center bg-base-200 font-mono',
		windowClass
	)}
>
	<div class="h-8 border-b w-full grid grid-cols-[1fr_auto_1fr] items-center font-semibold px-1">
		<div class="h-full aspect-square p-1 justify-self-start">
			<Icon width="null" class="aspect-square " {icon} />
		</div>

		<h1 class="flex h-full items-center gap-2 justify-self-center select-none">{title}</h1>

		<div class="justify-self-end h-full flex gap-4 p-2">
			<div class="aspect-square h-full text-center border-b-2 border-text"></div>
			<div class="aspect-square h-full text-center border-2 border-text"></div>
			<div class="aspect-square h-full text-center">
				<Icon width="null" class="aspect-square -m-[5px]" icon="lucide:x" />
			</div>
		</div>
	</div>
	<div class={cn('flex flex-col gap-4 p-4 w-full items-center', contentClass)}>
		{@render children?.()}
	</div>
</div>
