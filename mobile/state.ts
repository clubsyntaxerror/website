import type { schema } from "database";
import { useSyncExternalStore } from "react";
import { rpcClient, getToken, changeToken } from "./clients/rpc";
import { useLocales } from "expo-localization";

export type User = typeof schema.crewUsers.$inferSelect;

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
