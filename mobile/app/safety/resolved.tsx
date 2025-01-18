import React from "react";
import { View, Text } from "react-native";
import { useIsSwedish } from "../../state";
import withDeviceID from "../../components/withDeviceID";
import { rpcReact } from "../../clients/rpc";
import Error from "../../components/Error";
import Container from "../../components/Container";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReportCard from "../../components/ReportCard";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function ResolvedReports({ deviceId }: { deviceId: string }) {
    const swede = useIsSwedish();
    const { data, isLoading, isError } = rpcReact.getSafetyInbox.useQuery({
        deviceId,
        resolved: true,
    });

    if (isLoading)
        return (
            <LoadingSpinner
                title={
                    swede ? "Lösta säkerhetsposter" : "Resolved Safety Reports"
                }
            />
        );
    if (isError)
        return (
            <Error
                engError="Failed to load resolved safety reports"
                sveError="Kunde inte ladda in lösta säkerhetsposter"
            />
        );

    return (
        <Container
            title={swede ? "Lösta säkerhetsposter" : "Resolved Safety Reports"}
        >
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
        </Container>
    );
}

export default withDeviceID(ResolvedReports);
