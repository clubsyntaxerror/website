import React from "react";
import { Text, View } from "react-native";
import { useUser } from "../state";

export default function Index() {
    const user = useUser();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>{user ? user.forename : "No user"}</Text>
        </View>
    );
}
