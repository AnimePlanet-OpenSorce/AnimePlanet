<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div class="w-14">
	<div
		class="h-screen sticky top-0 w-full grid grid-cols-[100%_0] hover:grid-cols-[100%_15vw] grid-rows-[auto_1fr_auto_1fr_auto] transition-all"
	>
		<div class="col-start-2 row-start-1 row-end-6 bg-gradient-to-r from-neutral-900 from-15%"></div>
		<div class="col-start-1 row-start-1 row-end-6 bg-base-900"></div>
		<a href="/" class="row-start-1 local-subgrid">
			<Icon
				icon="lucide:sparkles"
				class="text-amber-400 glow-amber-400 hover:scale-110 transition m-2"
				width="null"
			/>
		</a>

		<div class="row-start-3 local-subgrid local-space nav-provider">
			{@render children()}
		</div>

		<div class="row-start-5 local-subgrid">
			<a href="/support" class="text-pink-700">
				<Icon icon="lucide:heart-handshake" class="glow-pink-500 m-2" width="null" />
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";

	.local-space {
		@apply gap-y-2;
	}

	:global(.local-space > * > svg) {
		@apply mx-4;
	}

	.local-subgrid {
		@apply col-start-1 col-end-3 grid grid-cols-subgrid items-center justify-center;
	}

	.nav-provider > :global(*) {
		@apply col-start-1 col-end-3 grid grid-cols-subgrid items-center justify-center;
	}
</style>
