<script lang="ts">
	import Navbar from '$lib/component/Navbar';
	import { encodeUrl } from '$lib/utils/url';
	import type { LayoutProps } from './$types';

	let { params, children }: LayoutProps = $props();
</script>

<div class="flex h-full flex-col p-4">
	<div>
		<h1 class="text-4xl font-bold">Panel Grupy: {encodeUrl(params.groupName)}</h1>
	</div>
	<div class="divider"></div>
	<div class="flex h-full gap-4">
		<Navbar.Menu>
			<Navbar.Link
				href="/group/{params.groupName}/admin/series/"
				pathnameReg={/\/group\/\w*\/admin\/series\/?.*/}
			>
				Serie
			</Navbar.Link>
		</Navbar.Menu>
		<div class="flex w-full flex-col">
			{@render children()}
		</div>
	</div>
</div>
