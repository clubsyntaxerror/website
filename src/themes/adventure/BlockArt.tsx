import type { ReactNode } from "react";
import { WIDTH, toRuns, type Bitmap } from "./art";
import { COLORS, HEX } from "./palette";

type Props = {
    bitmap: Bitmap;
    /** Accessible description. Omit for purely decorative art. */
    label?: string;
    className?: string;
    children?: ReactNode;
};

/** Renders block graphics as a full-width SVG with square pixels. */
export default function BlockArt({ bitmap, label, className, children }: Props) {
    return (
        <svg
            className={`adv-art ${className ?? ""}`}
            viewBox={`0 0 ${WIDTH} ${bitmap.height}`}
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
        >
            {toRuns(bitmap).map((run) => (
                <rect
                    key={`${run.x}-${run.y}`}
                    x={run.x}
                    y={run.y}
                    width={run.w}
                    height={1.02}
                    fill={HEX[COLORS[run.value - 1]]}
                />
            ))}
            {children}
        </svg>
    );
}
