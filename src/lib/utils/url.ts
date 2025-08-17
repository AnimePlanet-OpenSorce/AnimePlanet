import { BiMap } from './biMap';

export const unicodeMap = new BiMap([
	['~q', '?'],
	['~e', '!'],
	['~a', '&'],
	['~eq', '='],
	['~s', '/'],
	['~p', '%'],
	['~u', '_'],
	['_', ' ']
]);

export function encodeUrl(url: string): string {
	let encodedUrl = url;
	unicodeMap.entries().forEach(([replacement, char]) => {
		encodedUrl = encodedUrl.split(char).join(replacement);
	});
	return encodedUrl;
}

export function decodeUrl(encodedUrl: string): string {
	let decodedUrl = encodedUrl;
	unicodeMap.entries().forEach(([char, replacement]) => {
		decodedUrl = decodedUrl.split(replacement).join(char);
	});

	return decodedUrl;
}
