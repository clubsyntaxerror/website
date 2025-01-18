import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { deviceIdAtom } from "../state";

export default function withDeviceID<T extends { deviceId: string }>(
    Component: React.ComponentType<T>,
) {
    return (props: Omit<T, "deviceId">) => {
        const deviceId = deviceIdAtom.use();
        if (!deviceId) return <LoadingSpinner />;
        // @ts-expect-error: No idea why this is needed.
        return <Component {...props} deviceId={deviceId} />;
    };
}
