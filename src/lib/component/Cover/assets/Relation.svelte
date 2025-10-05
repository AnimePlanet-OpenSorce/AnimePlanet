<script lang="ts">
	type Props = {
		title: string;
		coverUrl: string;
	};

	const { title, coverUrl }: Props = $props();
</script>

<div class="relative aspect-37/53 h-55 overflow-hidden rounded-sm bg-base-300">
	<img src={coverUrl} alt={title} class="absolute inset-0 h-full w-full object-cover" />
</div>
