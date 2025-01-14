import React from "react";
import { Button, FlatList } from "react-native";
import { router } from "expo-router";
import { useUser, useIsSwedish } from "../../state";
import { rpcReact } from "../../clients/rpc";
import LoadingSpinner from "../../components/LoadingSpinner";
import Error from "../../components/Error";
import Container from "../../components/Container";
import EventCard from "../../components/EventCard";

export default function Events() {
    const user = useUser();
    const { data, isError, isLoading } = rpcReact.getEvents.useQuery(
        undefined,
        {
            staleTime: 120000,
        },
    );
    const swede = useIsSwedish();

    if (isError) {
        return (
            <Error
                sveError="Misslyckades med att ladda händelser"
                engError="Failed to load events"
            />
        );
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container>
            {user && (
                <Button
                    title={swede ? "Ny händelse" : "New event"}
                    onPress={() => {
                        router.push("/events/new");
                    }}
                />
            )}
            <FlatList
                data={data || []}
                renderItem={({ item, index }) => (
                    <EventCard
                        event={item.events}
                        callToAction={item.call_to_action}
                        key={index}
                    />
                )}
            />
        </Container>
    );
}
