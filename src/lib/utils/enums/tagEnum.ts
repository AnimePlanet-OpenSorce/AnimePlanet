import { getTag } from '$lib/actions/tag.remote';
import { Enum } from './enum';
import { onMount } from 'svelte';

export const tagEnum = async () => {
	return new Enum((await getTag()).map(({ name }) => name));
};
