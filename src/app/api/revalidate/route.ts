import { revalidatePath } from "next/cache";

export async function GET() {
    revalidatePath("/");
    revalidatePath("/dungeon", "layout");
    return Response.json({ revalidated: true, now: new Date(Date.now()) });
}
