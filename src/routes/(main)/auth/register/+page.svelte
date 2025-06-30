<script lang="ts">
	import AsciiBorder from '$lib/component/Ascii/AsciiBorder/AsciiBorder.svelte';
	import AsciiFrom from '$lib/component/Form/AsciiForm';
	import Window from '$lib/component/Window/Window.svelte';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';
	import { superForm } from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const superform = superForm(data.form);
</script>

<div class="flex justify-center items-center h-full">
	<Window title="Register">
		<!-- <h1></h1> -->

		<AsciiFrom {superform} class="contents">
			<div class="w-full grid grid-cols-2 gap-4 px-4">
				<div class="flex flex-col">
					<AsciiFrom.TextField {superform} field="login" placeholder="Login" />
					<AsciiFrom.TextField {superform} field="email" placeholder="Email" />
					<AsciiFrom.TextField {superform} field="password" placeholder="Password" />

					<AsciiFrom.DataField {superform} field="age" placeholder="Age" />
				</div>
				<AsciiBorder>
					<div class="flex justify-center items-center h-full">TODO: Profile logo upload</div>
				</AsciiBorder>
			</div>
			<button class="btn"> Register </button>
		</AsciiFrom>
	</Window>
</div>
