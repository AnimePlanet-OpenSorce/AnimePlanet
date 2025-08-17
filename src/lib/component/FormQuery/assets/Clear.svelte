<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';

	function clearParams() {
		page.url.search = '';

		console.log(page.url.search);

		goto(page.url);
	}
</script>

<div class="flex items-end justify-center">
	<button class="btn btn-square btn-ghost" onclick={clearParams}>
		<Icon icon="lucide:trash" class="text-2xl text-secondary" />
	</button>
</div>
