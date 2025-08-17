<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="m-4 grid h-full place-items-center">
	<div
		class="card mx-4 my-auto max-h-4/5 min-h-2/5 w-full max-w-3xl self-center bg-base-300 shadow-sm drop-shadow-xl md:aspect-16/9 md:card-side"
	>
		<figure class=" not-md:aspect-video md:max-w-2/5">
			<img
				src="https://placewaifu.com/image"
				alt="Movie"
				class="aspect-video h-full w-full"
				loading="eager"
			/>
		</figure>
		<div class="card-body gap-2 p-4">
			{@render children()}
		</div>
	</div>
</div>
