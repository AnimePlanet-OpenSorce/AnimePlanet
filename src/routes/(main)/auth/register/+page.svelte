<script lang="ts">
	import Window from '$lib/component/Window/Window.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const superform = superForm(data.form);
</script>

<div class="h-full flex justify-center items-center">
	<div class="grid grid-cols-2 w-full max-w-3xl h-[65%] shadow-xl overflow-hidden rounded-2xl">
		<div class="h-full w-full relative">
			<img src="/singup.jpg" alt="Login" class="h-full w-full object-cover rounded-l-2xl" />
			<div class="absolute inset-0 bg-black/20 bg-opacity-10"></div>
		</div>

		<Card.Root class="flex flex-col justify-normal h-full w-full p-8 bg-zinc-900 rounded-l-none ">
			<div class="pt-12">
				<Card.Title class="text-2xl font-bold">Create your account</Card.Title>
				<Card.Description class="pt-2 pb-6 text-gray-500">
					You arleady have an account?{' '}
					<a href="/auth/login" class="text-blue-500 hover:underline">Login </a></Card.Description
				>
			</div>

			<form class="flex flex-col gap-4 pt-0">
				<div class="grid gap-2">
					<Label for="nickname">Nickname</Label>
					<Input id="nickname" type="text" placeholder="Your nickname" required />
				</div>
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>

				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
					</div>
					<Input id="password" type="password" required />
				</div>

				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
					</div>
					<Input id="password" type="password" required />
				</div>

				<Button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 mt-6">Register</Button>

				<!-- <div class="relative my-6">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-zinc-600"></div>
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-zinc-900 px-2 text-slate-400">Or continue with</span>
					</div>
				</div> -->
			</form>
		</Card.Root>
	</div>
</div>
