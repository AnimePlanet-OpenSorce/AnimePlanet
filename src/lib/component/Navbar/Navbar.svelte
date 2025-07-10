<script lang="ts">
	import Icon from '@iconify/svelte';

	let isMenuOpen = false;

	const navLinks = [
		{ href: '/',            label: 'Strona Główna' },
		{ href: '/coming-soon', label: 'Wkrótce' },
		{ href: '/trending',    label: 'Popularne' }
	];
</script>

<nav class="fixed top-0 left-0 right-0 z-50 mx-4 mt-4">
	<div class="backdrop-blur-glass rounded-2xl border border-opacity-20 shadow-2xl"
			 style="border-color: var(--color-border)">
		<div class="max-w-7xl mx-auto px-6 py-4">
			<div class="flex items-center justify-between">
				<a href="/" class="flex items-center space-x-2">
					<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
						<Icon icon="tabler-player-play" class="w-4 h-4 text-white" />
					</div>
					<span class="text-xl font-bold gradient-text">HashiAnime</span>
				</a>

				<div class="hidden md:flex items-center space-x-6">
					{#each navLinks as { href, label }}
						<a
							href={href}
							class="text-sm font-medium hover:text-purple-400 transition-colors"
							style="color: var(--color-text)"
						>
							{label}
						</a>
					{/each}
					<a
						href="/search"
						class="text-sm font-medium hover:text-purple-400 transition-colors"
						style="color: var(--color-text)"
					>
						Wyszukaj
					</a>
				</div>

				<div class="hidden md:flex items-center space-x-3">
					<a href="/login"
						 class="px-4 py-2 text-sm font-medium rounded-full transition-all hover:bg-white/10"
						 style="color: var(--color-text)">
						Logowanie
					</a>
					<a href="/signup"
						 class="px-5 py-2 text-sm font-medium rounded-full transition-all hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
						Rejestracja
					</a>
				</div>

				<div class="flex md:hidden items-center space-x-2">
					<button
						class="p-2 rounded-lg transition-colors"
						on:click={() => isMenuOpen = !isMenuOpen}
						style="color: var(--color-text)"
					>
						<Icon icon={isMenuOpen ? 'tabler-x' : 'tabler-menu'} class="w-6 h-6" />
					</button>
					<a href="/search" class="p-2 rounded-lg transition-colors" style="color: var(--color-text)">
						<Icon icon="tabler-search" class="w-6 h-6" />
					</a>
				</div>
			</div>

			{#if isMenuOpen}
				<div class="mt-4 space-y-2 md:hidden">
					{#each navLinks as { href, label }}
						<a
							href={href}
							class="block text-base font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
							on:click={() => isMenuOpen = false}
							style="color: var(--color-text)"
						>
							{label}
						</a>
					{/each}
					<a
						href="/search"
						class="block text-base font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
						on:click={() => isMenuOpen = false}
						style="color: var(--color-text)"
					>
						Search
					</a>
				</div>
			{/if}
		</div>
	</div>
</nav>

<style lang="postcss">
    @reference "tailwindcss";
</style>
