import { query } from "$app/server";
import { db } from "$lib/server/db";

export const getTag = query(async () => {
    return await db.query.tag.findMany()
})