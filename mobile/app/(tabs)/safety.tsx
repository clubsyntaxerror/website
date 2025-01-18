import React from "react";
import { Button, ScrollView, View, Text } from "react-native";
import { router } from "expo-router";
import Container from "../../components/Container";
import withDeviceID from "../../components/withDeviceID";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useIsSwedish } from "../../state";
import Error from "../../components/Error";
import ReportCard from "../../components/ReportCard";
import { rpcReact } from "../../clients/rpc";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function Inbox({ deviceId, swede }: { deviceId: string; swede: boolean }) {
    const { data, isLoading, isError } = rpcReact.getSafetyInbox.useQuery({
        deviceId,
        resolved: false,
    });

    if (isLoading)
        return (
            <LoadingSpinner
                title={swede ? "Säkerhetsposter" : "Safety Reports"}
            />
        );
    if (isError)
        return (
            <Error
                engError="Failed to load safety inbox"
                sveError="Kunde inte ladda in säkerhetsposten"
            />
        );

    return (
        <ScrollView style={{ marginTop: 30 }}>
            {data?.length ? (
                data.map((report) => (
                    <ReportCard
                        key={report.safety_reports.id}
                        report={report.safety_reports}
                        eventMapping={report.event_map_locations}
                    />
                ))
            ) : (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >
                    <FontAwesome name="sticky-note" size={48} />
                    <Text style={{ marginTop: 16, fontSize: 18 }}>
                        {swede
                            ? "Inga obeslutsamma säkerhetsposter"
                            : "No unresolved safety reports"}
                    </Text>
                </View>
            )}
            <Button
                title={
                    swede
                        ? "Visa lösta säkerhetsposter"
                        : "View Resolved Reports"
                }
                onPress={() => router.push("/safety/resolved")}
            />
        </ScrollView>
    );
}

const WrappedInbox = withDeviceID(Inbox);

export default function Safety() {
    const swede = useIsSwedish();

    return (
        <Container title={swede ? "Säkerhet" : "Safety"}>
            <Button
                title={swede ? "Ny Säkerhetspost" : "New Safety Report"}
                onPress={() => router.push("/safety/new")}
            />
            <WrappedInbox swede={swede} />
        </Container>
    );
}
