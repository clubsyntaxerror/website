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
    const originalRef = React.useRef(obj[objKey]);
    const [value, setValueNoRefChange] = React.useState(() => obj[objKey]);
    const valueRef = React.useRef(value);

    const setValue = React.useCallback((newVal: O[K]) => {
        valueRef.current = newVal;
        setValueNoRefChange(newVal);
    }, []);

    React.useEffect(() => {
        const cb1 = hookWriteCallback(() => {
            writer(objKey, valueRef.current);
        });
        const cb2 = hookRollbackCallback(() => {
            writer(objKey, originalRef.current);
        });
        return () => {
            cb1();
            cb2();
        };
    }, []);

    // @ts-expect-error: Not 100% sure why this is needed.
    return <Consumer value={value} setValue={setValue} {...otherProps} />;
}
