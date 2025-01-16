import { db, schema } from "database";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// ws needed for neon in expo dev
neonConfig.webSocketConstructor = ws;

export async function GET() {
    // In dev, go ahead and create a token for a test user unless the user already exists.
    // See the Next app for production.

    try {
        await db.insert(schema.crewUsers).values({
            discordId: "test",
            username: "testuser",
            forename: "Test",
            surname: "User",
            email: "test@test.com",
            phoneNumber: "+46700000000",
        });
    } catch {}
    const token = crypto.randomUUID();
    await db.insert(schema.crewUserTokens).values({
        crewUserId: "test",
        token,
    });
    return Response.json({ token });
}
