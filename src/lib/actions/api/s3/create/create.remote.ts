import { command } from '$app/server';
import { env } from '$env/dynamic/private';
import { type } from 'arktype';

const S3Volume = type({
	count: 'number',
	fid: 'string',
	url: 'string',
	publicUrl: 'string'
});

const S3File = type({
	name: 'string',
	size: 'number',
	eTag: 'string'
});

const props = type({
	file: 'File'
});

export const s3Create = command(props, async ({ file }): Promise<{ url: string; fid: string }> => {
	if (!env.S3_MAIN) throw new Error('Env "S3_MAIN" not define.');
	if (!env.S3_VOLUME) throw new Error('Env "S3_VOLUME" not define.');

	const volume = S3Volume(await (await fetch(env.S3_MAIN + '/dir/assign')).json());
	if (volume instanceof type.errors) throw new Error(volume.summary);

	const fileUrl = `${env.S3_VOLUME}/${volume.fid}`;

	const form = new FormData();
	form.append('file', file);

	const response = S3File(
		await (
			await fetch(fileUrl, {
				method: 'POST',
				body: form
			})
		).json()
	);

	if (response instanceof type.errors) throw new Error(response.summary);

	return { url: fileUrl, fid: volume.fid };
});
