import { createHandler } from "trpc";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// ws needed for neon in expo dev
neonConfig.webSocketConstructor = ws;

// Here goes a little bit of ugliness.
const hn = createHandler();
export const OPTIONS = hn;
export const GET = hn;
export const POST = hn;
export const PUT = hn;
export const PATCH = hn;
export const DELETE = hn;
