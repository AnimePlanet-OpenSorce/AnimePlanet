<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		class?: string;
		classOpen?: string;
		classClose?: string;
		pathnameReg?: RegExp;
		icon?: string;
		children?: Snippet;
	};

	const {
		href,
		icon,
		class: className,
		classOpen,
		classClose,
		pathnameReg,
		children
	}: Props = $props();

	let isOpen = $derived(
		pathnameReg
			? new RegExp('^' + pathnameReg.source, pathnameReg.flags).test(page.url.pathname)
			: page.url.pathname === href
	);
</script>

<a
	{href}
	class={cn(
		'rounded-r-md transition duration-150',
		{
			[cn('bg-base-content text-base-100 drop-shadow-lg', classOpen)]: isOpen,
			[cn('hover:bg-[--alpha(var(--color-base-content)_/_15%)]', classClose)]: !isOpen
		},
		className
	)}
>
	{#if icon}
		<div class="aspect-square px-2 py-2">
			<Icon {icon} width="null" />
		</div>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</a>
