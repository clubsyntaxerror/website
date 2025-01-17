import { router, procedure } from "./trpc";
import { createContext } from "./context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { db, schema } from "database";
import { eq, sql, gte, isNotNull, isNull, and } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const deleteEventSchema = z.object({});

const createEventSchema = z.object({});

const editProfileSchema = z.object({
    forename: z.string().optional(),
    surname: z.string().optional(),
    phoneNumber: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
    bioSve: z.string().optional(),
    bioEng: z.string().optional(),
});

const inboxSchema = z.object({
    deviceId: z.string(),
    resolved: z.boolean(),
});

const conversationGetSchema = z.object({
    deviceId: z.string(),
    safetyReportId: z.string(),
});

const conversationReplySchema = conversationGetSchema.extend({
    message: z.string(),
});

let invalidator = (_: string) => {};

export function setInvalidator(fn: (route: string) => void) {
    invalidator = fn;
}

const appRouter = router({
    generateDeviceId: procedure
        .input(z.object({
            pushToken: z.string(),
        }))
        .mutation(async ({ input }) => {
            const deviceId = crypto.randomUUID();
            await db.insert(schema.mobileDevices).values({
                id: deviceId,
                pushToken: input.pushToken,
            });
            return deviceId;
        }),
    setIsSwedish: procedure
        .input(z.object({
            deviceId: z.string(),
            isSwedish: z.boolean(),
        }))
        .mutation(async ({ input }) => {
            await db
                .update(schema.mobileDevices)
                .set({ isSwedish: input.isSwedish })
                .where(eq(schema.mobileDevices.id, input.deviceId));
        }),
    getUser: procedure.query(({ ctx }) => ctx.user),
    killToken: procedure.mutation(async ({ ctx }) => {
        if (ctx.token) {
            await db
                .delete(schema.crewUserTokens)
                .where(eq(schema.crewUserTokens.token, ctx.token));
        }
    }),
    getEvents: procedure.query(() =>
        db
            .select()
            .from(schema.events)
            .where(gte(schema.events.eventEnd, sql`now()`))
            .leftJoin(
                schema.callToAction,
                eq(schema.events.callToActionId, schema.callToAction.id),
            ),
    ),
    deleteEvent: procedure
        .input(deleteEventSchema)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
        }),
    createEvent: procedure
        .input(createEventSchema)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
        }),
    getCrew: procedure.query(async ({ ctx }) => {
        const userRedactable = [
            "discordId",
            "email",
            "forename",
            "surname",
            "phoneNumber",
        ] as const;

        type UserPotentiallyRedacted = {
            [key in keyof typeof schema.crewUsers.$inferSelect]: key extends (typeof userRedactable)[number]
                ? (typeof schema.crewUsers.$inferSelect)[key] | null
                : (typeof schema.crewUsers.$inferSelect)[key];
        };

        const crew: UserPotentiallyRedacted[] = await db
            .select()
            .from(schema.crewUsers);

        if (!ctx.user) {
            for (const user of crew) {
                for (const key of userRedactable) {
                    user[key] = null;
                }
            }
        }

        return crew;
    }),
    editProfile: procedure
        .input(editProfileSchema)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            try {
                await db
                    .update(schema.crewUsers)
                    .set(input)
                    .where(eq(schema.crewUsers.discordId, ctx.user.discordId));
            } catch {
                throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
            }
            invalidator("/en");
            invalidator("/sv");
        }),
    getSafetyInbox: procedure
        .input(inboxSchema)
        .query(async ({ ctx, input }) => {
            const resolvedCheck = input.resolved
                ? isNotNull(schema.safetyReports.resolvedBy)
                : isNull(schema.safetyReports.resolvedBy);
            const where = ctx.user
                ? resolvedCheck
                : and(
                      eq(schema.safetyReports.deviceId, input.deviceId),
                      resolvedCheck,
                  );

            return db
                .select()
                .from(schema.safetyReports)
                .where(where)
                .leftJoin(
                    schema.eventMapLocations,
                    eq(
                        schema.safetyReports.eventMapLocationId,
                        schema.eventMapLocations.id,
                    ),
                );
        }),
    getConversation: procedure
        .input(conversationGetSchema)
        .query(async ({ ctx, input }) => {
            const where = ctx.user
                ? eq(schema.conversation.safetyReportId, input.safetyReportId)
                : and(
                      eq(
                          schema.conversation.safetyReportId,
                          input.safetyReportId,
                      ),
                      eq(schema.safetyReports.deviceId, input.deviceId),
                  );

            return (
                await db
                    .select({
                        conversation: schema.conversation,
                    })
                    .from(schema.conversation)
                    .innerJoin(
                        schema.safetyReports,
                        eq(
                            schema.conversation.safetyReportId,
                            schema.safetyReports.id,
                        ),
                    )
                    .where(where)
            ).map(({ conversation }) => conversation);
        }),
    replyToConversation: procedure
        .input(conversationReplySchema)
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user) {
                const res = await db
                    .select()
                    .from(schema.safetyReports)
                    .where(eq(schema.safetyReports.deviceId, input.deviceId));
                if (res.length === 0) {
                    throw new TRPCError({ code: "NOT_FOUND" });
                }
            }
            await db.insert(schema.conversation).values([
                {
                    safetyReportId: input.safetyReportId,
                    crewUsername: ctx.user?.username || null,
                    message: input.message,
                },
            ]);
        }),
    markAsResolved: procedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            if (!ctx.user) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            await db
                .update(schema.safetyReports)
                .set({ resolvedBy: ctx.user.username })
                .where(eq(schema.safetyReports.id, input));
        }),
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
