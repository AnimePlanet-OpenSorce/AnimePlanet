<script lang="ts">
	import Icon from '@iconify/svelte';

	type Props = {
		tip: string;
	};

	const { tip }: Props = $props();
</script>

<div class="tooltip" data-tip={tip}>
	<div class="flex aspect-square w-10 items-center p-2.5">
		<Icon icon="lucide:info" class="m-auto text-info" width="none" />
	</div>
</div>
