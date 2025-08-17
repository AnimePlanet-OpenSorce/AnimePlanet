<script>
	import Icon from '@iconify/svelte';
</script>

<div class="flex h-90 items-end px-4">
	<div
		class="absolute top-0 right-0 -z-10 h-100 w-screen bg-[url(https://s4.anilist.co/file/anilistcdn/media/anime/banner/179966-hf71VrF1zhPM.jpg)]"
	>
		<div class="h-full w-full bg-linear-to-t from-base-100 from-25% backdrop-brightness-80"></div>
	</div>

	<div class="flex flex-col gap-2">
		<h1 class="mb-4 text-4xl font-bold">Silent Witch: Chinmoku no Majo no Kakushigoto</h1>
		<div class="flex items-center text-sm">
			<span>TV Series</span>
			<Icon icon="lucide:dot" class="inline text-2xl opacity-60" />
			<span>13 Episodes</span>
			<Icon icon="lucide:dot" class="inline text-2xl opacity-60" />
			<span>Summer 2025</span>
		</div>
		<p class="line-clamp-2 max-w-150 brightness-75">
			Monica Everett, the Silent Witch, is the world’s only practitioner of Voiceless Magic, a
			veritable heroine who single-handedly fended off the Black Dragon of legend. However, the
			young prodigy is actually…super-duper shy! Yup, turns out she only learned Voiceless Magic to
			avoid speaking in public. Ignorant of this, the Seven Sages have placed her on a top-secret
			mission to guard the Second Prince. Can Monica keep it together as she contends with both
			social interaction and the evils targeting the young royal?
		</p>
		<div class="flex items-center text-sm">
			<span>Adventure</span>
			<Icon icon="lucide:dot" class="inline text-2xl opacity-60" />
			<span>Fantasy</span>
		</div>
		<div class="flex gap-2">
			<a href="/" class="btn w-fit btn-secondary">
				<Icon icon="material-symbols:play-arrow-rounded" class="inline text-xl" />
				Obejrzyj Teraz
			</a>

			<button class="btn btn-square btn-ghost">
				<Icon icon="lucide:heart" />
			</button>

			<button class="btn btn-square btn-ghost">
				<Icon icon="lucide:bookmark" />
			</button>
		</div>
		<div class="flex gap-2">
			{#each { length: 2 }}
				<div class="h-1 w-5 rounded-2xl bg-base-content opacity-25"></div>
			{/each}

			<div class="grid w-10 grid-cols-[3fr_1fr] overflow-hidden rounded-2xl">
				<div class="h-1 bg-base-content opacity-100"></div>
				<div class="h-1 bg-base-content opacity-25"></div>
			</div>

			{#each { length: 2 }}
				<div class="h-1 w-5 rounded-2xl bg-base-content opacity-25"></div>
			{/each}
		</div>
	</div>
</div>
