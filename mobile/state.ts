import type { schema } from "database";
import React from "react";
import { rpcClient, getToken, changeToken } from "./clients/rpc";
import { useLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

export type User = typeof schema.crewUsers.$inferSelect;

function buildSetUpdatePattern<T>(getter: () => T, cbSet: Set<() => void>) {
    return () =>
        React.useSyncExternalStore(
            (subscriber) => {
                cbSet.add(subscriber);
                return () => cbSet.delete(subscriber);
            },
            getter,
            getter,
        );
}

let user: User | null = null;
let userSubscribers = new Set<() => void>();

export function updateUserKey<K extends keyof User>(key: K, value: User[K]) {
    if (user) {
        user[key] = value;
        for (const subscriber of userSubscribers) {
            subscriber();
        }
    }
}

function updateUser() {
    rpcClient.getUser.query().then((newUser) => {
        user = newUser;
        for (const subscriber of userSubscribers) {
            subscriber();
        }
    });
}

getToken().then((token) => {
    if (token) updateUser();
});

export function setToken(token: string | null) {
    changeToken(token).then(() => {
        if (token) {
            updateUser();
        } else {
            user = null;
            for (const subscriber of userSubscribers) {
                subscriber();
            }
        }
    });
}

export const useUser = buildSetUpdatePattern(() => user, userSubscribers);

export function useIsSwedish() {
    const locales = useLocales();
    return locales[0].languageCode === "sv";
}

let deviceId: string | null = null;
const deviceIdSubscribers = new Set<() => void>();

// Handles the device ID. This will only ever be called once.
(async () => {
    if (typeof window !== "undefined") {
        deviceId = await AsyncStorage.getItem("deviceId");
        if (deviceId) {
            // We don't need to do anything more. Just tell everyone listening for this and return.
            for (const subscriber of deviceIdSubscribers) subscriber();
            return;
        }

        // Go ahead and get a push notification token.
        const pushToken = await Notifications.getExpoPushTokenAsync();

        // Get the server to generate a device ID for us.
        deviceId = await rpcClient.generateDeviceId.mutate({
            pushToken: pushToken.data,
        });
        await AsyncStorage.setItem("deviceId", deviceId!);

        // Since this is the initial setup, request permission to send push notifications.
        await Notifications.requestPermissionsAsync();

        // Tell everyone listening for this.
        for (const subscriber of deviceIdSubscribers) subscriber();
    }
})().catch((error) => {
    console.error("Failed to get device ID", error);
});

export const useDeviceID = buildSetUpdatePattern(
    () => deviceId,
    deviceIdSubscribers,
);

export function DeviceIDUpdater() {
    const swede = useIsSwedish();
    const deviceId = useDeviceID();

    // Whenever the users language changes, we should tell the server
    React.useEffect(() => {
        // Wait for the device ID to be set before sending the request.
        if (!deviceId) return;

        // Send the request to the server.
        rpcClient.setIsSwedish.mutate({ isSwedish: swede, deviceId: deviceId });
    }, [swede, deviceId]);

    return null;
}
