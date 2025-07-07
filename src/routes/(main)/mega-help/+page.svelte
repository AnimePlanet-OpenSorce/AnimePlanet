<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="card w-fit preset-filled-surface-100-900 p-6 text-center m-auto">
	<h1 class="h2">Wyczerpano limit odtwarzania na MEGA.NZ?</h1>
	<br />

	<div class="text-left w-fit m-auto">
		<h2 class="h5">Jeśli napotkasz na limit, masz trzy rozwiązania:</h2>

		<p>1. Poczekaj – limit odnowi się następnego dnia.</p>
		<p>2. Zgłoś nam tytuł – dodamy dla niego alternatywny odtwarzacz.</p>
		<p>3. Użyj VPN, aby ominąć ograniczenie.</p>
	</div>

	<br />

	<p>
		Możesz również poprosić o dodanie dodatkowego odtwarzacza na naszym serwerze <a class="anchor" href="https://discord.gg/cQsgvksdhf">
			Discord
		</a>
	</p>
</div>
