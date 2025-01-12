import { createHandler } from "trpc";

export const runtime = "edge";

const hn = createHandler();

// Here goes a little bit of ugliness.
export const OPTIONS = hn;
export const GET = hn;
export const POST = hn;
export const PUT = hn;
export const PATCH = hn;
export const DELETE = hn;
