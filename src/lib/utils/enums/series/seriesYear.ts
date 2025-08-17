import { Enum } from '../enum';

export const seriesYearEnum = new Enum<string, string>(
	Array.from({ length: 2025 - 1900 + 1 }, (_, i) => (2025 - i).toString())
);
