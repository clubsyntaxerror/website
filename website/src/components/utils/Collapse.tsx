"use client";

import SmoothCollapse from "react-smooth-collapse";
import { useMediaQuery } from "./hooks";

type Props = {
    children: React.ReactNode;
    expanded: boolean;
    id: string;
    className?: string;
};

export default function Collapse({ children, expanded, id, className }: Props) {
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    return (
        <div id={id} className={className || ""}>
            {prefersReducedMotion ? (
                <div className={expanded ? "block" : "hidden"}>{children}</div>
            ) : (
                <SmoothCollapse expanded={expanded}>{children}</SmoothCollapse>
            )}
        </div>
    );
}
