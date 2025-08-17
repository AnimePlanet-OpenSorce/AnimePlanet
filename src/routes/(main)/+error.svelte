<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="m-4 grid h-full place-items-center">
	<div
		class="card mx-4 my-auto max-h-4/5 min-h-2/5 w-full max-w-3xl self-center bg-base-300 shadow-sm drop-shadow-xl"
	>
		<div class="card-body items-center justify-center gap-2 p-6 text-2xl font-bold md:text-4xl">
			<h1>{page.status}</h1>
			<h2 class="text-center">{page.error?.message}</h2>

			<span class="text label block text-center text-base font-normal text-wrap">
				Jeśli nie wiesz czemu to widzisz zadaj pytanie na naszego <a
					class="link link-secondary"
					href="https://discord.gg/4qYWVq6B6y"
				>
					discorda
				</a>
			</span>
		</div>
	</div>
</div>
