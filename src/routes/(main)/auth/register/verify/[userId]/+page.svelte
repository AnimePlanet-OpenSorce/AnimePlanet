<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center gap-6 text-center text-lg text-wrap"
>
	<div>
		<h1 class="font-bold">Twoje konto zostało pomyślnie zweryfikowane.</h1>
		<span>
			Możesz się teraz <a class="link link-secondary" href="/auth/login">zalogować</a>.
		</span>
	</div>
	<span> Życzymy miłego korzystania z naszych usług. </span>
</div>
