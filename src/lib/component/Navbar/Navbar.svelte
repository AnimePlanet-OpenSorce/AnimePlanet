<script lang="ts">
	import Link from './assets/Link.svelte';
	import { getUser } from './server/data.remote';
	import Icon from '@iconify/svelte';

	const user = getUser();
</script>

<div class="sticky top-0 right-0 flex h-svh w-14 flex-col justify-start gap-6 py-4 pr-2">
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

		{#if user.current !== undefined}
			<Link href="/settings" icon="lucide:settings" pathnameReg={/\/settings\/?.*/} />

			{@const _user = user.current}

			{#if _user.role === 'admin' || _user.role === 'root'}
				<Link href="/admin" icon="lucide:shield-user" pathnameReg={/\/admin\/?.*/} />
			{/if}

			{#if _user.role === 'root'}
				<Link href="/root" icon="lucide:brick-wall-shield" pathnameReg={/\/root\/?.*/} />
			{/if}
		{:else}
			<Link href="/auth" icon="lucide:log-in" pathnameReg={/\/auth\/.*/} />
		{/if}
	</div>
</div>
