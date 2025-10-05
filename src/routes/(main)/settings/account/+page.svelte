<script lang="ts">
	import { enhance } from '$app/forms';
	import { singOut } from '$lib/actions/auth.remote';
	import Form from '$lib/component/Form';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<!-- <div class="max-w-2xl rounded-lg bg-base-300 px-4 py-2"></div> -->
<Form form={singOut}>
	<button class="btn mx-auto btn-secondary">Log out</button>
</Form>
