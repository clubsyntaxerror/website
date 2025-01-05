import { useSyncExternalStore } from "react";

export function useMediaQuery(query) {
    let matcher;
    if ("window" in globalThis && "matchMedia" in globalThis.window) {
        matcher = globalThis.window.matchMedia(query);
    }
    return useSyncExternalStore(
        (onStoreChange) => {
            if (matcher) {
                matcher.addEventListener("change", onStoreChange);
                return () => matcher.removeEventListener("change", onStoreChange);
            }
        },
        () => matcher?.matches,
        () => null,
    );
}
