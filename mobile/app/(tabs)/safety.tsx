import React from "react";
import { Text } from "react-native";
import Container from "../../components/Container";
import { useIsSwedish } from "../../state";

export default function Safety() {
    const swede = useIsSwedish();

    return (
        <Container title={swede ? "Säkerhet" : "Safety"}>
            <Text>Tab</Text>
        </Container>
    );
}
