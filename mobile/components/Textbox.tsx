import React from "react";
import { TextInput, Text } from "react-native";
import { z } from "zod";

export type Props = {
    value: string;
    setValue: (value: string) => void;
    setOkCallback: (fn: () => boolean) => void;
    checkFormState: () => void;
    schema: z.ZodString;
    bigInput: boolean;
    label: string;
};

export default function Textbox({
    value,
    setValue,
    setOkCallback,
    checkFormState,
    schema,
    bigInput,
    label,
}: Props) {
    React.useEffect(() => {
        return setOkCallback(() => schema.safeParse(value).success);
    }, [value, setOkCallback, schema]);

    const update = React.useCallback(
        (value: string) => {
            setValue(value);
            checkFormState();
        },
        [setValue, checkFormState],
    );

    return (
        <>
            <Text
                style={{ fontSize: 16, fontWeight: "bold" }}
                aria-hidden={true}
            >
                {label}
            </Text>
            <TextInput
                value={value}
                onChangeText={update}
                numberOfLines={bigInput ? 10 : 1}
                aria-label={label}
            />
        </>
    );
}
