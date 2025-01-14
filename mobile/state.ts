import type { schema } from "database";
import { useSyncExternalStore } from "react";
import { rpcClient, getToken, changeToken } from "./clients/rpc";
import { AppState } from "react-native";
import { useLocales } from "expo-localization";

export type User = typeof schema.crewUsers.$inferSelect;

let user: User | null = null;
let userSubscribers = new Set<() => void>();

let userRevision = 0;

function updateUser() {
    let ourRevision = ++userRevision;
    rpcClient.getUser.query().then((newUser) => {
        if (ourRevision === userRevision) {
            user = newUser;
            for (const subscriber of userSubscribers) {
                subscriber();
            }
        }
    });
}

getToken().then((token) => {
    if (token) updateUser();
});

export function setToken(token: string | null) {
    changeToken(token);
    if (token) {
        updateUser();
    } else {
        user = null;
        for (const subscriber of userSubscribers) {
            subscriber();
        }
    }
}

export function useUser() {
    return useSyncExternalStore(
        (subscriber) => {
            userSubscribers.add(subscriber);
            return () => userSubscribers.delete(subscriber);
        },
        () => user,
        () => user,
    );
}

export function useIsSwedish() {
    const locales = useLocales();
    return locales[0].languageCode === "sv";
}
