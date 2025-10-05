<script lang="ts">
	type Props = {
		src: string;
	};

	const { src }: Props = $props();
</script>

<div class="absolute top-0 right-0 -z-10 h-100 w-screen" style=" background-image: url({src})">
	<div class="h-full w-full bg-linear-to-t from-base-100 from-25% backdrop-brightness-80"></div>
</div>
