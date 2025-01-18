import React from "react";
import { Text } from "react-native";
import type { schema } from "database";

type SafetyReport = typeof schema.safetyReports.$inferSelect;
type EventMapLocation = typeof schema.eventMapLocations.$inferSelect;

type Props = {
    report: SafetyReport;
    eventMapping: EventMapLocation | null;
}

export default function ReportCard({ report, eventMapping }: Props) {
    return <Text>{report.id}</Text>;
}
