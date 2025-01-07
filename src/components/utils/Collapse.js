"use client";

import SmoothCollapse from "react-smooth-collapse";
import { useMediaQuery } from "./hooks";

export default function Collapse({ children, className, expanded, id }) {
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
