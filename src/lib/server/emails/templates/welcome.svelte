<script lang="ts">
	import Link from '$lib/component/Navbar/assets/Link.svelte';
	import { Button, Hr, Html, Text, Head, Body, Heading, Custom } from 'svelte-email-tailwind';

	type Props = {
		verificationLink: string;
		userName: string;
	};

	const { verificationLink, userName }: Props = $props();
</script>

<Html lang="pl">
	<Head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<title>Weryfikacja konta HoshiAnime</title>
	</Head>
	<Body class="bg-gray-100">
		<Custom class="mx-auto mt-10 max-w-xl rounded-lg bg-white p-6 shadow-md">
			<Heading class="mb-4 text-2xl font-bold text-indigo-600"
				>Witaj, <span class="capitalize">{userName}</span>!</Heading
			>

			<Text class="mb-6 text-gray-700">
				Dziękujemy za rejestrację na naszej stronie. Aby zakończyć proces tworzenia konta, prosimy o
				weryfikację adresu e-mail.
			</Text>
			<Button
				href={verificationLink}
				class="inline-block rounded-md bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
			>
				Zweryfikuj konto
			</Button>
			<Text class="mt-6 text-sm text-gray-500">
				Jeśli nie rejestrowałeś się na HoshiAnime, zignoruj tę wiadomość.
			</Text>
			<Custom class="mt-10 text-center text-xs text-gray-400">
				&copy; 2025 HoshiAnime. Wszelkie prawa zastrzeżone.
			</Custom>
		</Custom>
	</Body>
</Html>
