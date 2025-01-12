import { useSyncExternalStore } from "react";

export function useMediaQuery(query: string) {
    let matcher: MediaQueryList | undefined;
    if ("window" in globalThis && "matchMedia" in globalThis.window) {
        matcher = globalThis.window.matchMedia(query);
    }
    return useSyncExternalStore(
        (onStoreChange) => {
            if (matcher) {
                matcher.addEventListener("change", onStoreChange);
                return () => matcher.removeEventListener("change", onStoreChange);
            }
            return () => {};
        },
        () => (matcher || { matches: null }).matches,
        () => null,
    );
}
