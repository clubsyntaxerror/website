import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function Container({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title }} />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});
