import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useIsSwedish } from "../../state";

export default function TabLayout() {
    const swede = useIsSwedish();

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: swede ? "Händelser" : "Events",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="calendar" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="safety"
                options={{
                    title: swede ? "Säkerhet" : "Safety",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="shield" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="crew"
                options={{
                    title: "Crew",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome size={28} name="users" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
