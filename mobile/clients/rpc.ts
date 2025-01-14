import type { AppRouter } from "trpc";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

let tokenPromise = AsyncStorage.getItem("token");

export function getToken() {
    return tokenPromise;
}

export async function changeToken(token: string | null) {
    if (token) {
        await AsyncStorage.setItem("token", token);
    } else {
        await AsyncStorage.removeItem("token");
    }
    tokenPromise = Promise.resolve(token);
}

export const rpcClient = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: process.env.TRPC_URL || "https://syntax-error.se/api/trpc",
            async headers() {
                const token = await tokenPromise;
                if (token) {
                    return { Authorization: `Bearer ${token}` };
                }
                return {};
            },
        }),
    ],
});

export const rpcReact = createTRPCReact<AppRouter>();
