import React from "react";
import { Text } from "react-native";
import { useIsSwedish } from "../../state";
import Container from "../../components/Container";
import withDeviceID from "../../components/withDeviceID";

function SafetyNew({ deviceId }: { deviceId: string }) {
    const swede = useIsSwedish();

    // TODO: Implement
    return (
        <Container title={swede ? "Ny Säkerhetspost" : "New Safety Report"}>
            <Text>SafetyNew</Text>
        </Container>
    );
}

export default withDeviceID(SafetyNew);
