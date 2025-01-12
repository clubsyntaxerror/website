import { router } from "./trpc";
import { createContext } from "./context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const appRouter = router({
    // ...
});

export type AppRouter = typeof appRouter;

export function createHandler() {
    return (req: Request) =>
        fetchRequestHandler({
            router: appRouter,
            endpoint: "/api/trpc",
            req,
            createContext,
        });
}
