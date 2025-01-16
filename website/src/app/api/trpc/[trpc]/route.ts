import { createHandler, setInvalidator } from "trpc";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

// We need to tell the package where to find the invalidator function.
setInvalidator(revalidatePath);

// Here goes a little bit of ugliness.
const hn = createHandler();
export const OPTIONS = hn;
export const GET = hn;
export const POST = hn;
export const PUT = hn;
export const PATCH = hn;
export const DELETE = hn;
