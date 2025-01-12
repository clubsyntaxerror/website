import type { schema } from "database";
import { useSyncExternalStore } from "react";
import rpc, { getToken, changeToken } from "./clients/rpc";

export type User = typeof schema.crewUsers.$inferSelect;

let user: User | null = null;
let userSubscribers = new Set<() => void>();

let userRevision = 0;

function updateUser() {
    let ourRevision = ++userRevision;
    rpc.getUser.query().then((newUser) => {
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
