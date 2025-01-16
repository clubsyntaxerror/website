import React from "react";
import Textbox, { Props } from "./Textbox";

type OurProps = Props & {
    value: string | null;
    setValue: (value: string | null) => void;
};

export default function NullableTextbox({
    value,
    setValue,
    ...props
}: OurProps) {
    return (
        <Textbox
            {...props}
            value={value ?? ""}
            setValue={(value) => setValue(value === "" ? null : value)}
        />
    );
}
