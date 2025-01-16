import { cookies } from "next/headers";
import { db, schema } from "database";

export const runtime = "edge";

function getAllowedUserIds() {
    const allowedUserIds = process.env.DISCORD_ALLOWED_USER_IDS;
    if (!allowedUserIds) {
        throw new Error("DISCORD_ALLOWED_USER_IDS is not set");
    }
    return allowedUserIds.split(",");
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    if (!code) {
        return Response.json({ error: "No code" }, { status: 400 });
    }

    const tokenResp = await fetch("https://discord.com/api/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            code,
            grant_type: "authorization_code",
            redirect_uri: process.env.DISCORD_REDIRECT_URI,
        }),
    });
    if (!tokenResp.ok) {
        return Response.json({ error: "Failed to fetch token" }, { status: 400 });
    }
    const tokenJson = await tokenResp.json();

    const user = await fetch("https://discord.com/api/users/@me", {
        headers: {
            Authorization: `Bearer ${tokenJson.access_token}`,
        },
    });
    if (user.status !== 200) {
        return Response.json({ error: "Failed to fetch user" }, { status: 400 });
    }
    const userData = (await user.json()) as { id: string };
    if (!getAllowedUserIds().includes(userData.id)) {
        return Response.json({ error: "User not allowed" }, { status: 400 });
    }

    const token = crypto.randomUUID();
    await db.insert(schema.crewUserTokens).values({
        crewUserId: userData.id,
        token,
    });

    return Response.json({ token });
}
