import React from "react";
import { Text } from "react-native";
import Container from "../../components/Container";
import { useIsSwedish } from "../../state";

export default function NewEvent() {
    const swede = useIsSwedish();

    return (
        <Container title={swede ? "Ny Händelse" : "New Event"}>
            <Text>New event page</Text>
        </Container>
    );
}
