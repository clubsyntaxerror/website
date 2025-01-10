"use client";

import { useState, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { useMediaQuery } from "./utils/hooks";
import Collapse from "./utils/Collapse";
import type { Event } from "../app/eventData";

type KeyAlignerProps = {
    rootRef: React.RefObject<HTMLDivElement | null>;
    alignKey: string;
    children: React.ReactNode;
};

function KeyAligner({ rootRef, alignKey, children }: KeyAlignerProps) {
    const [padding, setPadding] = useState(0);
    const spanRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const dates = rootRef.current!.querySelectorAll(
            `[data-align="${CSS.escape(alignKey)}"]`,
        ) satisfies NodeListOf<HTMLElement>;
        let longestElement: HTMLElement = spanRef.current!;
        for (const date of dates) {
            if (date.offsetWidth > longestElement.offsetWidth) {
                longestElement = date;
            }
        }
        const padding = longestElement!.offsetWidth - spanRef.current!.offsetWidth;
        setPadding(padding);
    }, [children, rootRef, alignKey]);

    return (
        <span style={{ paddingRight: `${padding}px` }}>
            <span ref={spanRef} data-align={alignKey}>
                {children}
            </span>
        </span>
    );
}

export default function Events({ events }: { events: Event[] }) {
    const [expanded, setExpanded] = useState(-1);
    const desktop = useMediaQuery("(min-width: 1500px)");

    const rootRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={rootRef}>
            {events.length > 0 && <h2 className="text-center text-white mb-4">Party calendar</h2>}
            <div className={`grid ${desktop ? "grid-cols-3" : "grid-cols-1"} gap-4`}>
                {events.map((event, index) => {
                    const eventAddress = event.optionalVenueStreetAddress
                        ? ", " + event.optionalVenueStreetAddress
                        : event.venueName === "H62"
                          ? ", Hornsgatan 62, 118 21 Stockholm"
                          : "";

                    const innerContent = (
                        <span className="flex">
                            <span className="flex-col pr-4" aria-hidden={true}>
                                <KeyAligner rootRef={rootRef} alignKey="date">
                                    {event.shortDate}:
                                </KeyAligner>
                            </span>
                            <span className="flex-col">
                                <span className="sr-only">{event.longDate}: </span>
                                <span className="rainbow_text_animated">{event.eventName}</span>
                                {!desktop && (
                                    <span aria-label={expanded === index ? " Collapse" : " Expand"}>
                                        {expanded === index ? "\u00A0<" : "\u00A0>"}
                                    </span>
                                )}
                            </span>
                        </span>
                    );
                    const collapsableId = useId();

                    return (
                        <article key={index} className="text-gray-500">
                            <h3>
                                {desktop ? (
                                    <span className="block">{innerContent}</span>
                                ) : (
                                    <button
                                        onClick={() => setExpanded(expanded === index ? -1 : index)}
                                        aria-expanded={expanded === index}
                                        aria-controls={collapsableId}
                                        className="text-left block"
                                    >
                                        {innerContent}
                                    </button>
                                )}
                            </h3>
                            <Collapse expanded={expanded === index || !!desktop} id={collapsableId} className="my-2">
                                <p>{event.eventDescription}</p>
                                <div className="pl-6 relative">
                                    <div className="ping"></div>
                                    <div className="ball -ml-12"></div>
                                    <p className="mb-0 text-xs md:text-l pb-1" aria-hidden="true">
                                        <img
                                            src="/icons/date.png"
                                            className="inline align-text-mniddle md:align-text-middle"
                                            width="18"
                                            height="18"
                                            aria-hidden="true"
                                        />{" "}
                                        {event.longDate}
                                        {event.optionalFacebookEventUrl && (
                                            <Link
                                                className="underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase text-pu"
                                                href={event.optionalFacebookEventUrl}
                                                target="_blank"
                                            >
                                                Facebook RSVP
                                            </Link>
                                        )}
                                    </p>
                                    <p className="mb-0 text-xs md:text-l pb-1">
                                        <img
                                            src="/icons/time.png"
                                            className="inline align-text-middle md:align-text-middle"
                                            width="18"
                                            height="18"
                                            alt="Time"
                                            aria-hidden="true"
                                        />{" "}
                                        {event.openingHours}
                                    </p>
                                    <address className="mb-0 text-xs md:text-l not-italic events">
                                        <img
                                            src="/icons/location.png"
                                            className="inline align-text-middle md:align-text-middle pb-1"
                                            width="18"
                                            height="18"
                                            alt="Location"
                                        />{" "}
                                        {event.venueName}
                                        {eventAddress && (
                                            <Link
                                                className="underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase"
                                                href={
                                                    "https://maps.google.com/maps?q=" + encodeURIComponent(eventAddress)
                                                }
                                                target="_blank"
                                            >
                                                Get directions
                                            </Link>
                                        )}
                                    </address>
                                    <p className="mb-0 text-xs  md:text-l">
                                        <img
                                            src="/icons/ticket.png"
                                            className="inline align-text-middle md:align-text-middle pb-1"
                                            width="18"
                                            height="18"
                                            alt="Tickets"
                                        />{" "}
                                        {event.optionalCoverFee ? event.optionalCoverFee + " SEK" : "N/A"}
                                        {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                            <Link
                                                className="underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase"
                                                href={event.optionalCallToActionUrl}
                                                target="_blank"
                                            >
                                                {event.optionalCallToActionTitle}
                                            </Link>
                                        )}
                                    </p>
                                </div>
                            </Collapse>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
