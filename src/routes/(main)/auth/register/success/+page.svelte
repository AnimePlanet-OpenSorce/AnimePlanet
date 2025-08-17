<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center gap-6 text-center text-lg text-wrap"
>
	<div class="font-bold">
		<h1>Twoje konto zostało pomyślnie utworzone.</h1>
	</div>
	<div>
		<p class="">
			Aby dokończyć rejestrację, prosimy o potwierdzenie adresu e-mail. Kliknij link w tej
			wiadomości, aby aktywować konto.
			<br />
		</p>
	</div>
	<div>
		<p class="label text-wrap">Jeśli nie widzisz wiadomości, sprawdź folder Spam.</p>
	</div>
</div>
