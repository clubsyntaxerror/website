import { cache } from "react";
import { getEvents, type Event } from "../../app/eventData";
import type { QuestSummary, World } from "./client";
import { QUEST_PREFIX, ROOMS } from "./rooms";

/** Parties are "quests", numbered 1, 2, 3... in date order. */
export const MAX_LISTED_QUESTS = 9;

const pad = (n: number) => n.toString().padStart(2, "0");

/** Stable, shareable URL part for a party: its start date. */
export function eventSlug(event: Event) {
    const d = event.startDate;
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export type Quest = Event & { number: number; slug: string; href: string };

export const getQuests = cache(async (): Promise<Quest[]> => {
    const now = new Date();
    return (await getEvents())
        .filter((event) => !isNaN(event.startDate.getTime()) && new Date(event.endDate) >= now)
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
        .slice(0, MAX_LISTED_QUESTS)
        .map((event, i) => {
            const slug = eventSlug(event);
            return { ...event, number: i + 1, slug, href: `${QUEST_PREFIX}${slug}` };
        });
});

export function nextQuest(quests: Quest[]) {
    return quests.find((q) => !q.optionalHideFromHero) ?? quests[0];
}

/** What the client needs to know about the world: the command line, the status bar and the map. */
export const getWorld = cache(async (): Promise<World> => {
    const quests = await getQuests();
    const next = nextQuest(quests);
    return {
        quests: quests.map(
            (q): QuestSummary => ({
                number: q.number,
                name: q.eventName,
                href: q.href,
                slug: q.slug,
                date: `${shortWeekday(q)} ${shortDayMonth(q)}`,
                ticket: q.optionalCallToActionUrl || undefined,
                start: q.startDate.toISOString(),
                end: new Date(q.endDate).toISOString(),
                price: price(q),
            }),
        ),
        nextSlug: next?.slug,
        danceHref: next?.href ?? ROOMS.quests.href,
    };
});

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

/** Entry fee in gold (SEK). */
export function price(event: Event) {
    if (!event.optionalCoverFee) return "FREE";
    return isNaN(parseFloat(event.optionalCoverFee)) ? event.optionalCoverFee : `${event.optionalCoverFee} GOLD`;
}
