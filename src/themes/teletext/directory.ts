import { getEvents, type Event } from "../../app/eventData";

/** Fixed teletext page numbers. Parties get 201, 202... in date order. */
export const PAGES = {
    index: { number: 100, href: "/" },
    parties: { number: 200, href: "/parties" },
    about: { number: 300, href: "/about" },
    faq: { number: 400, href: "/faq" },
    rules: { number: 500, href: "/rules" },
    newsletter: { number: 600, href: "/newsletter" },
    links: { number: 700, href: "/links" },
    crew: { number: 800, href: "/crew" },
} as const;

export const MAX_LISTED_PARTIES = 9;

const pad = (n: number) => n.toString().padStart(2, "0");

/** Stable, shareable URL part for a party: its start date. */
export function eventSlug(event: Event) {
    const d = event.startDate;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function eventHref(event: Event) {
    return `/party/${eventSlug(event)}`;
}

export type NumberedEvent = Event & { number: number; slug: string; href: string };

export async function getUpcomingEvents(): Promise<NumberedEvent[]> {
    const now = new Date();
    return (await getEvents())
        .filter((event) => !isNaN(event.startDate.getTime()) && event.startDate >= now)
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .slice(0, MAX_LISTED_PARTIES)
        .map((event, i) => ({ ...event, number: 201 + i, slug: eventSlug(event), href: eventHref(event) }));
}

/** Page number -> URL, handed to the client so typed numbers can navigate. */
export async function getDirectory(): Promise<Record<number, string>> {
    const directory: Record<number, string> = {};
    for (const page of Object.values(PAGES)) directory[page.number] = page.href;
    for (const event of await getUpcomingEvents()) directory[event.number] = event.href;
    return directory;
}

export function eventAddress(event: Event) {
    if (event.optionalVenueStreetAddress) return event.optionalVenueStreetAddress;
    if (event.venueName === "H62") return "Hornsgatan 62, 118 21 Stockholm";
    return undefined;
}

export function directionsUrl(event: Event) {
    const address = eventAddress(event);
    return address
        ? "https://maps.google.com/maps?q=" + encodeURIComponent(`${event.venueName}, ${address}`)
        : undefined;
}

export function shortWeekday(event: Event) {
    return event.startDate.toLocaleString("en-us", { weekday: "short" }).toUpperCase();
}

export function shortDayMonth(event: Event) {
    return event.startDate.toLocaleString("en-GB", { day: "numeric", month: "short" }).toUpperCase();
}

export function price(event: Event) {
    if (!event.optionalCoverFee) return "FREE ENTRY";
    return isNaN(parseFloat(event.optionalCoverFee)) ? event.optionalCoverFee : `${event.optionalCoverFee} SEK`;
}
