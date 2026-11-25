import type { CSSProperties, ReactNode } from "react";
import { SEP, WIDTH, toRuns, type Bitmap } from "./mosaic";

type Props = {
    bitmap: Bitmap;
    /** Accessible description. Omit for purely decorative art. */
    label?: string;
    className?: string;
    children?: ReactNode;
};

/** Renders a mosaic bitmap as an SVG that spans exactly 40 character cells and N rows. */
export default function Mosaic({ bitmap, label, className, children }: Props) {
    const style = { "--rows": bitmap.cellRows } as CSSProperties;
    return (
        <svg
            className={`tt-mosaic ${className ?? ""}`}
            viewBox={`0 0 ${WIDTH} ${bitmap.height}`}
            preserveAspectRatio="none"
            style={style}
            role={label ? "img" : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
        >
            {toRuns(bitmap).map((run) =>
                run.value & SEP ? (
                    <rect
                        key={`${run.x}-${run.y}`}
                        x={run.x + 0.18}
                        y={run.y + 0.18}
                        width={0.64}
                        height={0.64}
                        className={`c${run.value & 7}`}
                    />
                ) : (
                    <rect
                        key={`${run.x}-${run.y}`}
                        x={run.x}
                        y={run.y}
                        width={run.w}
                        height={1.02}
                        className={`c${run.value & 7}`}
                    />
                ),
            )}
            {children}
        </svg>
    );
}
