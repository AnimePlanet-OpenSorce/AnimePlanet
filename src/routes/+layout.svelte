<script lang="ts">
	import Toaster from '$lib/component/Toaster/Toaster.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<Toaster />
{@render children()}
