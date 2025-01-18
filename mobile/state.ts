import type { schema } from "database";
import React from "react";
import { rpcClient, getToken, changeToken } from "./clients/rpc";
import { useLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export type User = typeof schema.crewUsers.$inferSelect;

function atom<T>(initialValue: T) {
    const cbs = new Set<() => void>();
    return {
        use: () =>
            React.useSyncExternalStore(
                (subscriber) => {
                    cbs.add(subscriber);
                    return () => cbs.delete(subscriber);
                },
                () => initialValue,
                () => initialValue,
            ),
        mutate: (cb: (value: T) => void) => {
            cb(initialValue);
            for (const subscriber of cbs) subscriber();
        },
        set: (value: T) => {
            initialValue = value;
            for (const subscriber of cbs) subscriber();
        },
    };
}

export const userAtom = atom<User | null>(null);

export function updateUserKey<K extends keyof User>(key: K, value: User[K]) {
    userAtom.mutate((user) => {
        if (user) user[key] = value;
    });
}

function updateUser() {
    rpcClient.getUser.query().then(userAtom.set);
}

getToken().then((token) => {
    if (token) updateUser();
});

export function setToken(token: string | null) {
    changeToken(token).then(() => {
        if (token) {
            updateUser();
        } else {
            userAtom.set(null);
        }
    });
}

export function useIsSwedish() {
    const locales = useLocales();
    return locales[0].languageCode === "sv";
}

export const deviceIdAtom = atom<string | null>(null);

// Handles the device ID. This will only ever be called once.
(async () => {
    if (typeof window !== "undefined") {
        const deviceIdLookup = await AsyncStorage.getItem("deviceId");
        if (deviceIdLookup) {
            // We don't need to do anything except write this to the atom.
            deviceIdAtom.set(deviceIdLookup);
            return;
        }

        // Go ahead and get a push notification token.
        const pushToken = await Notifications.getExpoPushTokenAsync();

        // Get the server to generate a device ID for us.
        const generatedId = await rpcClient.generateDeviceId.mutate({
            pushToken: pushToken.data,
        });
        await AsyncStorage.setItem("deviceId", generatedId);

        // Since this is the initial setup, request permission to send push notifications.
        await Notifications.requestPermissionsAsync();

        // Set the device ID in the atom.
        deviceIdAtom.set(generatedId);
    }
})().catch((error) => {
    console.error("Failed to get device ID", error);
});

export function DeviceIDUpdater() {
    const swede = useIsSwedish();
    const deviceId = deviceIdAtom.use();

    // Whenever the users language changes, we should tell the server
    React.useEffect(() => {
        // Wait for the device ID to be set before sending the request.
        if (!deviceId) return;

        // Send the request to the server.
        rpcClient.setIsSwedish.mutate({ isSwedish: swede, deviceId: deviceId });
    }, [swede, deviceId]);

    return null;
}
