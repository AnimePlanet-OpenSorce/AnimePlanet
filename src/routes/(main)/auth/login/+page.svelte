<script lang="ts">
	import AsciiFrom from '$lib/component/Form/AsciiForm';
	import Window from '$lib/component/Window/Window.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const superform = superForm(data.form);
</script>

<div class="h-full flex justify-center items-center">
	<Window title="Login" icon="lucide:terminal">
		<h1 class="text-2xl px-4">Witamy ponownie</h1>

		<AsciiFrom {superform} class="contents">
			<div class="w-full flex flex-col gap-2 px-4">
				<AsciiFrom.TextField {superform} field="login" placeholder="Login" />
				<AsciiFrom.TextField {superform} field="password" placeholder="Password">
					{#snippet bottomRight()}
						<a href="/help" class="text-primary underline">Nie pamiętam hasła</a>
					{/snippet}
				</AsciiFrom.TextField>
			</div>

			<div class="flex gap-4">
				<button class="btn"> Login </button>

				<a
					href="./register"
					class="border px-3 border-text hover:border-text-muted hover:text-text-muted"
				>
					Register
				</a>
			</div>
		</AsciiFrom>
	</Window>
</div>
