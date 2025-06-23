<script lang="ts">
	import Navbar from '$lib/component/Navbar';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<div class="grid grid-cols-[auto_1fr]">
	<Navbar>
		<Navbar.Link href="/" icon="lucide:home">Home</Navbar.Link>
		<Navbar.Link href="/auth" icon="lucide:log-in">Login</Navbar.Link>
	</Navbar>

	<div class="flex flex-col">
		{@render children()}
	</div>
</div>
