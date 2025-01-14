import React from "react";
import { Stack } from "expo-router";
import { rpcReact, rpcClient } from "../clients/rpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <rpcReact.Provider client={rpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </QueryClientProvider>
        </rpcReact.Provider>
    );
}
