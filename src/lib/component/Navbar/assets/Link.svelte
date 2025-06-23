<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		href: string;
		icon: string;
		children: Snippet;
	};

	const { href, icon, children }: Props = $props();
</script>

<a {href}>
	<Icon {icon} width="null" class="" />

	<div class="overflow-hidden">
		{@render children()}
	</div>
</a>
