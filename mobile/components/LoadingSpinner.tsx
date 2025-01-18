import React from "react";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function LoadingSpinner({ title }: { title?: string }) {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            {title && <Stack.Screen options={{ title }} />}
            <ActivityIndicator size="large" />
        </View>
    );
}
