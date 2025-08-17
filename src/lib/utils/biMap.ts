export class BiMap<K extends string, V extends string> {
	private forward: Map<K, V> = new Map();
	private reverse: Map<V, K> = new Map();

	constructor(entries?: [K, V][]) {
		if (entries) {
			for (const [k, v] of entries) {
				this.set(k as K, v as V);
			}
		}
	}

	set(key: K, value: V): void {
		this.forward.set(key, value);
		this.reverse.set(value, key);
	}

	getByKey(key: K): V | undefined {
		return this.forward.get(key);
	}

	getByValue(value: V): K | undefined {
		return this.reverse.get(value);
	}

	hasKey(key: K): boolean {
		return this.forward.has(key);
	}

	hasValue(value: V): boolean {
		return this.reverse.has(value);
	}

	deleteByKey(key: K): void {
		const value = this.forward.get(key);
		if (value !== undefined) {
			this.forward.delete(key);
			this.reverse.delete(value);
		}
	}

	deleteByValue(value: V): void {
		const key = this.reverse.get(value);
		if (key !== undefined) {
			this.reverse.delete(value);
			this.forward.delete(key);
		}
	}

	keys(): K[] {
		return Array.from(this.forward.keys());
	}

	values(): V[] {
		return Array.from(this.forward.values());
	}

	entries(): [K, V][] {
		return Array.from(this.forward.entries());
	}

	size(): number {
		return this.forward.size;
	}

	clear(): void {
		this.forward.clear();
		this.reverse.clear();
	}
}
