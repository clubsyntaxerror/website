import React from "react";
import LoadingSpinner from "./LoadingSpinner";
import { useDeviceID } from "../state";

export default function withDeviceID<T extends { deviceId: string }>(Component: React.ComponentType<T>) {
    return (props: Omit<T, "deviceId">) => {
        const deviceId = useDeviceID();
        if (!deviceId) return <LoadingSpinner />;
        // @ts-expect-error: No idea why this is needed.
        return <Component {...props} deviceId={deviceId} />;
    };
}
