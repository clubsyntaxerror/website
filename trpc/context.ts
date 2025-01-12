import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { db, schema } from "database";
import { eq } from "drizzle-orm";

export async function createContext({ req }: FetchCreateContextFnOptions) {
    let user: typeof schema.crewUsers.$inferSelect | null = null;
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (token) {
        const dbRes = await db.query.crewUserTokens.findFirst({
            where: eq(schema.crewUserTokens.token, token),
            with: {
                crewUser: true,
            },
        });
        if (dbRes) user = dbRes.crewUser;
    }

    return { user, token };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
