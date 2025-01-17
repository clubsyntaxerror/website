import React from "react";
import { Stack } from "expo-router";
import { rpcReact, rpcClient } from "../clients/rpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useIsSwedish, DeviceIDUpdater } from "../state";

export default function RootLayout() {
    const [queryClient] = React.useState(() => new QueryClient());
    const swede = useIsSwedish();

    return (
        <rpcReact.Provider client={rpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <DeviceIDUpdater />
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerTitle: swede ? "Tillbaka" : "Back",
                            headerShown: false,
                        }}
                    />
                </Stack>
            </QueryClientProvider>
        </rpcReact.Provider>
    );
}
