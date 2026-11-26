import { revalidatePath } from "next/cache";

export async function GET() {
    revalidatePath("/");
    // Theme pages live under /<theme> internally (see src/middleware.ts).
    revalidatePath("/adventure", "layout");
    return Response.json({ revalidated: true, now: new Date(Date.now()) });
}
