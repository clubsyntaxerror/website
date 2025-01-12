import { db, schema } from "database";
import { cache } from "react";
import { gte, sql, asc, eq } from "drizzle-orm";

export const getEvents = cache(async () => {
    const events = await db
        .select()
        .from(schema.events)
        .where(gte(schema.events.eventStart, sql`now()`))
        .orderBy(asc(schema.events.eventStart))
        .limit(7)
        .leftJoin(schema.callToAction, eq(schema.events.callToActionId, schema.callToAction.id));

    return events.map((e) => ({
        ...e.events,
        callToAction: e.call_to_action,
    }));
});

export type Event = Awaited<ReturnType<typeof getEvents>>[number];
