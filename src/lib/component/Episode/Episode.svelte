<script lang="ts">
	import type { episode } from '$lib/server/db/schema';

	type Props = typeof episode.$inferInsert & { href?: string };

	const { number, title, description, coverUrl, duration, href }: Props = $props();
</script>

<a
	{href}
	class="z-20 flex h-28 cursor-pointer overflow-hidden rounded-md bg-base-300 transition-transform select-none hover:scale-102"
>
	<div
		class="relative aspect-video h-full bg-cover"
		style="background-image: url({coverUrl ??
			'https://img1.ak.crunchyroll.com/i/spire4-tmb/d80b3fbce742e6deb4d2caf37d08ca6e1395451246_full.jpg'});"
	>
		<div
			class="absolute right-0 bottom-0 m-1 rounded-lg bg-[color-mix(in_hsl,_var(--color-base-300),_transparent_40%)] px-1.5 text-sm font-semibold"
		>
			{duration} min
		</div>
	</div>
	<div class="flex flex-col p-4">
		<h4 class="font-semibold">
			{number}. {title}
		</h4>
		<p class="mt-auto line-clamp-2">
			{description}
		</p>
	</div>
</a>
