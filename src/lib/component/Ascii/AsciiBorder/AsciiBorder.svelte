<script lang="ts" module>
	export type Props = {
		children?: Snippet;
		topLeft?: Snippet;
		bottomLeft?: Snippet;
		topRight?: Snippet;
		bottomRight?: Snippet;
		class?: string;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utility/cn';
	import XLine from './assets/XLine.svelte';
	import { onMount, type Snippet } from 'svelte';

	let container: HTMLElement | undefined = $state();

	let font: string = $state('');
	let lineHeight: number = $state(0);

	let divHeight: number = $state(0);

	let height: number = $state(0);

	onMount(() => {
		const computedStyle = window.getComputedStyle(container as Element);
		const fontFamily = computedStyle.fontFamily;
		const fontSize = parseFloat(computedStyle.fontSize);

		font = `${fontSize}px ${fontFamily}`;

		const lineHeightStr = computedStyle.lineHeight;

		const lineHeightMatch = lineHeightStr.match(/(\d+\.?\d*)/);

		if (lineHeightMatch && lineHeightMatch[1]) {
			lineHeight = parseFloat(lineHeightMatch[1]);
		}
	});

	$effect(() => {
		height = Math.floor(divHeight / lineHeight);
	});

	const {
		children,
		topLeft,
		bottomLeft,
		topRight,
		bottomRight,
		class: className
	}: Props = $props();
</script>

{#snippet corner()}
	<div class="text-center items-center select-none">+</div>
{/snippet}

{#snippet yLine()}
	<div
		class="flex flex-col justify-center select-none overflow-hidden"
		bind:clientHeight={divHeight}
	>
		{#each { length: height }}
			<span> | </span>
		{/each}
	</div>
{/snippet}

<div
	class={cn('w-full h-full grid grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto]', className)}
	bind:this={container}
>
	{@render corner()}
	<div class="grid grid-cols-[auto_1fr_auto] overflow-hidden">
		<div class={cn({ 'ml-0.5': topLeft })}>
			{@render topLeft?.()}
		</div>
		<XLine {font} />
		<div class={cn({ 'mr-0.5': topRight })}>
			{@render topRight?.()}
		</div>
	</div>
	{@render corner()}
	{@render yLine()}
	<div class="items-center">
		{@render children?.()}
	</div>
	{@render yLine()}
	{@render corner()}
	<div class="grid grid-cols-[auto_1fr_auto] overflow-hidden truncate">
		<div class={cn({ 'ml-0.5': bottomLeft })}>
			{@render bottomLeft?.()}
		</div>
		<XLine {font} />
		<div class={cn({ 'mr-0.5': bottomRight })}>
			{@render bottomRight?.()}
		</div>
	</div>
	{@render corner()}
</div>
