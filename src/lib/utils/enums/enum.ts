import { BiMap } from '../biMap';

export class Enum<K extends string, V extends string> extends BiMap<K, V> {
	constructor(object?: Record<K, V> | (K | V)[]) {
		if (!object) {
			super();
			return;
		}

		if (Array.isArray(object)) {
			super(object.map((v) => [v as K, v as V]));
		} else {
			super(Object.entries(object).map(([key, value]) => [key as K, value as V]));
		}
	}
}
