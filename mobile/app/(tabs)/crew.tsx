import React from "react";
import { Button, FlatList, Text } from "react-native";
import Container from "../../components/Container";
import { useIsSwedish, userAtom } from "../../state";
import { Link, router } from "expo-router";
import { rpcReact } from "../../clients/rpc";
import LoadingSpinner from "../../components/LoadingSpinner";
import Error from "../../components/Error";
import UserCard from "../../components/UserCard";

export default function Crew() {
    const user = userAtom.use();
    const swede = useIsSwedish();
    const { data, isLoading, isError } = rpcReact.getCrew.useQuery(undefined, {
        staleTime: 120000,
    });

    if (isLoading) {
        return <LoadingSpinner title="Crew" />;
    }

    if (isError) {
        return (
            <Error
                sveError="Misslyckades med att hämta crew"
                engError="Failed to fetch crew"
            />
        );
    }

    let crewText = user ? (
        <Link href="/auth">
            You are currently logged in as {user.username}. Click here to log
            out.
        </Link>
    ) : (
        <Link href="/auth">If you are a crew member, login here.</Link>
    );
    if (swede) {
        crewText = user ? (
            <Link href="/auth">
                Du är inloggad som {user.username}. Klicka här för att logga ut.
            </Link>
        ) : (
            <Link href="/auth">Om du är medlem i crew, logga in här.</Link>
        );
    }

    return (
        <Container title="Crew">
            {user && (
                <Button
                    title={swede ? "Redigera Profil" : "Edit Profile"}
                    onPress={() => {
                        router.push("/profile");
                    }}
                />
            )}
            <FlatList
                data={data || []}
                renderItem={({ item, index }) => (
                    <UserCard user={item} key={index} />
                )}
            />
            <Text style={{ textAlign: "center" }}>{crewText}</Text>
        </Container>
    );
}
