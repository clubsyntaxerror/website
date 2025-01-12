import { db, schema } from "database";
import { cache } from "react";
import { gte, sql, asc } from "drizzle-orm";

export const getEvents = cache(async () => {
    return db.query.events.findMany({
        where: gte(schema.events.eventStart, sql`now()`),
        orderBy: asc(schema.events.eventStart),
        limit: 7,
        with: {
            callToAction: true,
        },
    });
});

export type Event = Awaited<ReturnType<typeof getEvents>>[number];
