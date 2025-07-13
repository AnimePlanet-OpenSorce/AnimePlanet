<script lang="ts">
	import { page } from '$app/state';
	import { cn } from '$lib/utils/cn';
	import Icon from '@iconify/svelte';

	type Props = {
		href: string;
		icon: string;
		class?: string;
		classOpen?: string;
		classClose?: string;
		pathnameReg?: RegExp;
	};

	const { href, icon, class: className, classOpen, classClose, pathnameReg }: Props = $props();

	let isOpen = $derived(
		pathnameReg ? pathnameReg.test(page.url.pathname) : page.url.pathname === href
	);
</script>

<a
	{href}
	class={cn(
		'rounded-r-md transition duration-150',
		{
			[cn('bg-base-content text-base-100 drop-shadow-lg', classOpen)]: isOpen,
			[cn('hover:bg-neutral', classClose)]: !isOpen
		},
		className
	)}
>
	<div class="aspect-square px-2 py-2">
		<Icon {icon} width="null" />
	</div>
</a>
