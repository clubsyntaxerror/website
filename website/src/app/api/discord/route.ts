import { cookies } from "next/headers";

export const runtime = "edge";

export async function GET() {
    let discordClientId = process.env.DISCORD_CLIENT_ID;
    if (!discordClientId) {
        throw new Error("DISCORD_CLIENT_ID is not set");
    }
    let redirectUri = process.env.DISCORD_REDIRECT_URI;
    if (!redirectUri) {
        throw new Error("DISCORD_REDIRECT_URI is not set");
    }

    const url = new URL("https://discord.com/oauth2/authorize");
    url.searchParams.set("client_id", discordClientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "identify");

    const cookieJar = await cookies();
    const state = crypto.randomUUID();
    cookieJar.set("discord_state", state);
    return Response.redirect(url.toString());
}
