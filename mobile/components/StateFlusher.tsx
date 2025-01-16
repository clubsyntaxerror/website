import React from "react";

type StateFlusherProps<
    O extends {},
    K extends keyof O,
    ConsumerProps extends {
        value: O[K];
        setValue: (value: O[K]) => void;
    },
> = {
    obj: O;
    objKey: K;
    writer: (key: K, value: O[K]) => void;
    hookWriteCallback: (fn: () => void) => () => void;
    hookRollbackCallback: (fn: () => void) => () => void;
    consumer: (props: ConsumerProps) => React.ReactNode;
    otherProps: Omit<ConsumerProps, "value" | "setValue">;
};

export default function StateFlusher<
    O extends {},
    K extends keyof O,
    ConsumerProps extends {
        value: O[K];
        setValue: (value: O[K]) => void;
    },
>({
    obj,
    objKey,
    writer,
    hookWriteCallback,
    hookRollbackCallback,
    consumer: Consumer,
    otherProps,
}: StateFlusherProps<O, K, ConsumerProps>) {
    const [original] = React.useState(obj[objKey]);
    const [value, setValueNoRefChange] = React.useState(original);
    const valueRef = React.useRef(value);

    const setValue = React.useCallback((value: O[K]) => {
        valueRef.current = value;
        setValueNoRefChange(value);
    }, []);

    React.useEffect(() => {
        const write = hookWriteCallback(() => {
            writer(objKey, valueRef.current);
        });
        const rollback = hookRollbackCallback(() => {
            setValue(original);
        });

        return () => {
            write();
            rollback();
        };
    }, []);

    // @ts-expect-error: Not 100% sure why this is needed.
    return <Consumer value={value} setValue={setValue} {...otherProps} />;
}
