import { type, Type } from "arktype";

export function transformNumbers<T extends Type<object>>(schema: T) {
  // pobieramy oryginalny opis schematu
  const def = (schema as any).definition as Record<string, unknown>;

  // zamieniamy wszystkie pola number → string.number.parse
  const transformedDef: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(def)) {
    if (value === "number") {
      transformedDef[key] = "string.number.parse";
    } else {
      transformedDef[key] = value;
    }
  }

  // zwracamy nowy typ
  return type(transformedDef);
}