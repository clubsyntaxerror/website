import React from "react";
import { Text } from "react-native";
import Container from "../../components/Container";
import { useIsSwedish, useUser } from "../../state";
import { Link } from "expo-router";

export default function Crew() {
    const user = useUser();
    const swede = useIsSwedish();

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
        <Container>
            <Text style={{ textAlign: "center" }}>{crewText}</Text>
        </Container>
    );
}
