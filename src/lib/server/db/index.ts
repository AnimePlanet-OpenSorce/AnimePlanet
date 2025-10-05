import { DATABASE_URL } from '$env/static/private';
import * as schema from './schema/index';
import { Column, ilike, or, SQL, sql, type SQLWrapper } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(DATABASE_URL);

export const db = drizzle(client, { schema, casing: 'snake_case' });

await db.execute(sql`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

export const search = (
	column: Column | SQL.Aliased | SQL,
	value: string | SQLWrapper
): SQL | undefined => or(sql`${column} % ${value}`, ilike(column, `%${value}%`));
