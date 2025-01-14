import React from "react";
import { View, Text } from "react-native";
import { useIsSwedish } from "../state";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type Props = {
    sveError: string;
    engError: string;
};

export default function Error({ sveError, engError }: Props) {
    const error = useIsSwedish() ? sveError : engError;

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <FontAwesome name="exclamation-circle" size={48} />
            <Text style={{ marginTop: 16, fontSize: 18 }}>{error}</Text>
        </View>
    );
}
