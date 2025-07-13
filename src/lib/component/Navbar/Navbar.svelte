<script lang="ts">
	import Link from './assets/Link.svelte';
	import Icon from '@iconify/svelte';
</script>

<div class="sticky top-0 flex h-screen w-12 flex-col justify-start gap-6 py-4">
	<div class="pl-3">
		<div class="p-1 text-amber-400">
			<Icon width="null" icon="lucide:moon-star" />
		</div>
	</div>

	<div class="flex flex-col gap-2 *:pl-3">
		<Link href="/" icon="lucide:home" />
		<Link href="/search" icon="lucide:search" />
		<Link href="/upcoming" icon="lucide:calendar" />
	</div>

	<div class="mt-auto flex flex-col gap-2 *:pl-3">
		<Link
			href="/support"
			icon="lucide:heart-handshake"
			class="text-pink-400"
			classClose="hover:bg-transparent hover:animate-pulse hover:scale-125"
		/>
		<Link href="/auth" icon="lucide:log-in" pathnameReg={/\/auth\/.*/} />
	</div>
</div>
