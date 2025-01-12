import type { AppRouter } from "trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export default createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: process.env.TRPC_URL || "https://syntax-error.se/api/trpc",
        }),
    ],
});
