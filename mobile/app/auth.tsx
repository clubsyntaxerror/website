import React from "react";
import { router, Stack } from "expo-router";
import { Platform } from "react-native";
import { WebView } from "react-native-webview";
import { useUser, setToken, useIsSwedish } from "../state";
import { rpcClient } from "../clients/rpc";
import LoadingSpinner from "../components/LoadingSpinner";

const loginStartUrl =
    process.env.NODE_ENV === "development"
        ? "/api/discord"
        : "https://www.syntax-error.se/api/discord";

export default function Auth() {
    // Need for the titles.
    const swede = useIsSwedish();

    // If the user is logged in, unauthenticate and go back.
    const user = useUser();
    const wvRef = React.useRef<WebView>(null);

    // Defines the initial URL for the webview.
    const [initialUrl, setInitialUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (user) {
            // If the user is logged in, unauthenticate and go back.
            rpcClient.killToken.mutate();
            setToken(null);
            router.back();
        } else {
            // Do the fetch request to get the initial URL.
            fetch(loginStartUrl).then(async (res) => {
                if (!res.ok) {
                    throw new Error(
                        `Failed to fetch initial URL: ${await res.text()}`,
                    );
                }
                setInitialUrl(await res.text());
            });
        }
    }, []);

    // Initially, show a loading screen.
    if (!initialUrl) {
        return <LoadingSpinner title={swede ? "Logga in" : "Login"} />;
    }

    // Return the webview with a callback to handle the login.
    const handleLogin = (req: { url: string }) => {
        const url = new URL(req.url);
        if (url.pathname.endsWith("/finish")) {
            // Call with fetch and handle the response
            wvRef.current?.stopLoading();
            router.back();
            fetch(req.url).then(async (res) => {
                if (!res.ok) {
                    throw new Error(`Login failed: ${await res.text()}`);
                }
                const data: { token: string } = await res.json();
                setToken(data.token);
            });
            return false;
        }
        return true;
    };
    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                    title: swede ? "Logga in" : "Login",
                }}
            />
            <WebView
                originWhitelist={["*"]}
                source={{ uri: initialUrl }}
                onShouldStartLoadWithRequest={
                    Platform.OS === "ios" ? handleLogin : undefined
                }
                onNavigationStateChange={
                    Platform.OS === "android" ? handleLogin : undefined
                }
                ref={Platform.OS === "android" ? wvRef : undefined}
            />
        </>
    );
}
