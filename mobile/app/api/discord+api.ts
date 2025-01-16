export function GET(req: Request) {
    // In dev, just redirect to /api/discord/finish. See the Next app for production.
    const url = new URL(req.url);
    url.pathname = "/api/discord/finish";
    return new Response(url.toString(), {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
