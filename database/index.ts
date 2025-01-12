import * as schema from "./schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

const db = drizzle(new Pool({ connectionString: process.env.DATABASE_URL! }), {
    schema,
});

export { schema, db };
