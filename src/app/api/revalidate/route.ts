import { revalidatePath } from "next/cache";

export async function GET() {
    revalidatePath("/en");
    revalidatePath("/sv");
    return Response.json({ revalidated: true, now: new Date(Date.now()) });
}
