import React from "react";
import { router } from "expo-router";
import { Button, View, Text, ScrollView } from "react-native";
import type { schema } from "database";
import { z } from "zod";
import { rpcClient, rpcReact } from "../clients/rpc";
import { updateUserKey, useIsSwedish, useUser } from "../state";
import Container from "../components/Container";
import StateFlusher from "../components/StateFlusher";
import Textbox from "../components/Textbox";
import NullableTextbox from "../components/NullableTextbox";

function Editor({ user }: { user: typeof schema.crewUsers.$inferSelect }) {
    // Check if the user is a swede.
    const swede = useIsSwedish();

    // Defines the state of the form.
    const [formState, setFormState] = React.useState<
        "ok" | "error" | "disabled"
    >("ok");
    const okCallbackRefs = React.useRef<Set<() => boolean>>(new Set());
    const setOkCallback = React.useCallback((fn: () => boolean) => {
        okCallbackRefs.current.add(fn);
        return () => okCallbackRefs.current.delete(fn);
    }, []);
    const checkFormState = React.useCallback(() => {
        for (const fn of okCallbackRefs.current) {
            if (!fn()) {
                setFormState("disabled");
                return;
            }
        }
        setFormState("ok");
    }, []);
    const reactUtils = rpcReact.useUtils();

    // Create a set of write callbacks and rollback callbacks and a function to add them to the set + allow them to be removed.
    const writeRefs = React.useRef<Set<() => void>>(new Set());
    const hookWriteCallback = React.useCallback((fn: () => void) => {
        writeRefs.current.add(fn);
        return () => writeRefs.current.delete(fn);
    }, []);
    const rollbackRefs = React.useRef<Set<() => void>>(new Set());
    const hookRollbackCallback = React.useCallback((fn: () => void) => {
        rollbackRefs.current.add(fn);
        return () => rollbackRefs.current.delete(fn);
    }, []);

    // Write the profile to the database.
    const writeProfile = React.useCallback(async () => {
        setFormState("disabled");
        for (const fn of writeRefs.current) {
            fn();
        }
        rpcClient.editProfile
            .mutate({
                username: user.username,
                forename: user.forename,
                surname: user.surname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                bioEng: user.bioEng ?? undefined,
                bioSve: user.bioSve ?? undefined,
            })
            .catch(() => {
                for (const fn of rollbackRefs.current) {
                    fn();
                }
                setFormState("error");
            })
            .then(() => {
                // Bust the cache and set the form to OK.
                reactUtils.getCrew.invalidate();
                setFormState("ok");
            });
    }, []);

    // Return the editor body.
    // TODO: Add a profile picture uploader.
    return (
        <Container title={swede ? "Redigera Profil" : "Edit Profile"}>
            {formState === "error" && (
                <Text style={{ color: "red" }}>
                    {swede
                        ? "Något gick fel, försök igen senare."
                        : "Something went wrong, try again later."}
                </Text>
            )}

            <ScrollView>
                <StateFlusher
                    obj={user}
                    objKey="username"
                    writer={updateUserKey}
                    hookWriteCallback={hookWriteCallback}
                    hookRollbackCallback={hookRollbackCallback}
                    consumer={Textbox}
                    otherProps={{
                        setOkCallback,
                        checkFormState,
                        label: swede ? "Användarnamn" : "Username",
                        schema: z.string().min(1),
                        bigInput: false,
                    }}
                />
                <StateFlusher
                    obj={user}
                    objKey="forename"
                    writer={updateUserKey}
                    hookWriteCallback={hookWriteCallback}
                    hookRollbackCallback={hookRollbackCallback}
                    consumer={Textbox}
                    otherProps={{
                        setOkCallback,
                        checkFormState,
                        label: swede ? "Förnamn" : "Forename",
                        schema: z.string().min(1),
                        bigInput: false,
                    }}
                />
                <StateFlusher
                    obj={user}
                    objKey="surname"
                    writer={updateUserKey}
                    hookWriteCallback={hookWriteCallback}
                    hookRollbackCallback={hookRollbackCallback}
                    consumer={Textbox}
                    otherProps={{
                        setOkCallback,
                        checkFormState,
                        label: swede ? "Efternamn" : "Surname",
                        schema: z.string().min(1),
                        bigInput: false,
                    }}
                />
                <StateFlusher
                    obj={user}
                    objKey="email"
                    writer={updateUserKey}
                    hookWriteCallback={hookWriteCallback}
                    hookRollbackCallback={hookRollbackCallback}
                    consumer={Textbox}
                    otherProps={{
                        setOkCallback,
                        checkFormState,
                        label: swede ? "E-post" : "Email",
                        schema: z.string().email(),
                        bigInput: false,
                    }}
                />
                <StateFlusher
                    obj={user}
                    objKey="phoneNumber"
                    writer={updateUserKey}
                    hookWriteCallback={hookWriteCallback}
                    hookRollbackCallback={hookRollbackCallback}
                    consumer={Textbox}
                    otherProps={{
                        setOkCallback,
                        checkFormState,
                        label: swede ? "Telefonnummer" : "Phone Number",
                        schema: z
                            .string()
                            .min(1)
                            .regex(/^\+[0-9]+$/),
                        bigInput: false,
                    }}
                />
                <StateFlusher
                    obj={user}
                    objKey="bioEng"
                    writer={updateUserKey}
                    hookWriteCallback={hookWriteCallback}
                    hookRollbackCallback={hookRollbackCallback}
                    consumer={NullableTextbox}
                    otherProps={{
                        setOkCallback,
                        checkFormState,
                        label: swede ? "Engelsk Bio" : "English Bio",
                        schema: z.string(),
                        bigInput: true,
                    }}
                />
                <StateFlusher
                    obj={user}
                    objKey="bioSve"
                    writer={updateUserKey}
                    hookWriteCallback={hookWriteCallback}
                    hookRollbackCallback={hookRollbackCallback}
                    consumer={NullableTextbox}
                    otherProps={{
                        setOkCallback,
                        checkFormState,
                        label: swede ? "Svensk Bio" : "Swedish Bio",
                        schema: z.string(),
                        bigInput: true,
                    }}
                />

                <View style={{ marginTop: 10 }}>
                    <Button
                        disabled={formState === "disabled"}
                        onPress={writeProfile}
                        title={swede ? "Spara" : "Save"}
                    />
                </View>
            </ScrollView>
        </Container>
    );
}

export default function Profile() {
    // We need the user to edit it!
    const user = useUser();

    // Handle if the user isn't logged in. This is a very weird case, but just in case.
    React.useEffect(() => {
        if (!user) {
            router.back();
        }
    }, []);
    if (!user) {
        return <View />;
    }

    // Return the profile editor.
    return <Editor user={user} />;
}
