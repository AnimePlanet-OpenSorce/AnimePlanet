<script lang="ts">
	import Navbar from '$lib/component/Navbar';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<div class="flex h-full flex-col p-4">
	<div>
		<h1 class="text-4xl font-bold">Ustawienia</h1>
	</div>
	<div class="divider"></div>
	<div class="flex h-full gap-4">
		<Navbar.Menu>
			<Navbar.Link href="/settings/account">Account</Navbar.Link>
		</Navbar.Menu>
		<div class="flex flex-col">
			{@render children()}
		</div>
	</div>
</div>
