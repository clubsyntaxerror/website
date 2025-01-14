import { router, procedure } from "./trpc";
import { createContext } from "./context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { db, schema } from "database";
import { eq, sql, gte } from "drizzle-orm";

const appRouter = router({
    getUser: procedure.query(({ ctx }) => ctx.user),
    killToken: procedure.mutation(({ ctx }) => {
        if (ctx.token) {
            db.delete(schema.crewUserTokens).where(
                eq(schema.crewUserTokens.token, ctx.token),
            );
        }
    }),
    getEvents: procedure.query(() =>
        db
            .select()
            .from(schema.events)
            .where(gte(schema.events.eventEnd, sql`now()`))
            .innerJoin(
                schema.callToAction,
                eq(schema.events.callToActionId, schema.callToAction.id),
            ),
    ),
});

export type AppRouter = typeof appRouter;

export function createHandler() {
    return (req: Request) =>
        fetchRequestHandler({
            router: appRouter,
            endpoint: "/api/trpc",
            req,
            createContext,
        });
}
