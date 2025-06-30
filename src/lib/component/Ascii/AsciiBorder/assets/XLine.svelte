<script lang="ts">
	const props: { font: string } = $props();

	let divWidth: number = $state(0);

	let width: number = $state(0);

	$effect(() => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		if (!context) {
			return;
		}

		context.font = props.font;

		const testString = 'A'.repeat(100);
		context.fillText(testString, 0, 0);

		const testWidth = context.measureText(testString).width;
		const averageCharWidth = testWidth / 100;

		width = Math.floor(divWidth / averageCharWidth);

		canvas.remove();
	});
</script>

<div class="text-center select-none overflow-hidden mx-0.5" bind:clientWidth={divWidth}>
	{#each { length: width }}
		-
	{/each}
</div>
