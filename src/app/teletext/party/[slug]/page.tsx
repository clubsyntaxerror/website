import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEvents } from "../../../eventData";
import Mosaic from "../../../../themes/teletext/MosaicArt";
import { eventBanner } from "../../../../themes/teletext/banner";
import {
    PAGES,
    directionsUrl,
    eventAddress,
    eventSlug,
    getUpcomingEvents,
    price,
    shortDayMonth,
    shortWeekday,
} from "../../../../themes/teletext/directory";
import { Button, DH, Gap, Rule, TeletextPage } from "../../../../themes/teletext/ui";
import type { FastextItem } from "../../../../themes/teletext/client";
import { eventSchema } from "../../../../content/eventSchema";

type Params = { params: Promise<{ slug: string }> };

async function findEvent(slug: string) {
    const upcoming = await getUpcomingEvents();
    const listed = upcoming.find((e) => e.slug === slug);
    if (listed) return { event: listed, number: listed.number, upcoming, past: false };
    const any = (await getEvents()).find((e) => !isNaN(e.startDate.getTime()) && eventSlug(e) === slug);
    if (!any) return undefined;
    return { event: any, number: 299, upcoming, past: new Date(any.endDate) < new Date() };
}

export async function generateStaticParams() {
    return (await getUpcomingEvents()).map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const found = await findEvent(slug);
    if (!found) return {};
    const { event } = found;
    return {
        title: `${event.eventName} – ${event.longDate} – Club Syntax Error`,
        description: event.eventDescription,
        alternates: { canonical: `https://www.syntax-error.se/party/${slug}` },
    };
}

export default async function PartyPage({ params }: Params) {
    const { slug } = await params;
    const found = await findEvent(slug);
    if (!found) notFound();
    const { event, number, upcoming, past } = found;
    const banner = eventBanner(event.eventName, event.eventDescription, event.startDate, slug);
    const address = eventAddress(event);
    const directions = directionsUrl(event);
    const tickets = !past && event.optionalCallToActionUrl ? event.optionalCallToActionUrl : undefined;
    const index = upcoming.findIndex((e) => e.slug === slug);
    const nextParty = index >= 0 ? upcoming[index + 1] : undefined;

    const fastext: FastextItem[] = [
        { label: "PARTIES", href: PAGES.parties.href },
        tickets ? { label: "TICKETS", href: tickets, external: true } : { label: "NEWS", href: PAGES.newsletter.href },
        nextParty
            ? { label: `NEXT ${nextParty.number}`, href: nextParty.href }
            : { label: "FAQ", href: PAGES.faq.href },
        { label: "INDEX", href: PAGES.index.href },
    ];

    return (
        <TeletextPage number={number} fastext={fastext}>
            {!past && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(event)) }}
                />
            )}
            <h1>
                {banner ? (
                    <Mosaic bitmap={banner} label={event.eventName} />
                ) : (
                    <DH color="yellow" center>
                        {event.eventName.toUpperCase()}
                    </DH>
                )}
            </h1>
            {past && <p className="bg-red fg-yellow tt-center">THIS PARTY HAS ENDED - SEE {PAGES.parties.number}</p>}
            <DH color="white">
                {shortWeekday(event)} {shortDayMonth(event)} {event.startDate.getFullYear()}
            </DH>
            <div className="tt-facts">
                <p>
                    <span className="fg-yellow">TIME </span>
                    {event.openingHours}
                    {event.optionalAgeLimit && <span className="fg-red"> {event.optionalAgeLimit}+</span>}
                </p>
                <p>
                    <span className="fg-yellow">PLACE </span>
                    {event.venueName}
                    {address && <span className="fg-cyan">, {address}</span>}
                </p>
                <p>
                    <span className="fg-yellow">ENTRY </span>
                    <span className="fg-green">{price(event)}</span>
                </p>
            </div>
            <Gap />
            <Rule color="cyan" />
            {event.eventDescription.split(/\n+/).map((para: string, i: number) => (
                <p key={i}>{para}</p>
            ))}
            <Gap />
            {tickets && (
                <Button href={tickets} external big>
                    {">> "}
                    {(event.optionalCallToActionTitle || "Buy tickets").toUpperCase()}
                    {" <<"}
                </Button>
            )}
            {directions && (
                <Button href={directions} external bg="blue" color="white">
                    DIRECTIONS
                </Button>
            )}
            {event.optionalFacebookEventUrl && (
                <Button href={event.optionalFacebookEventUrl} external bg="magenta" color="white">
                    FACEBOOK EVENT
                </Button>
            )}
            {nextParty && (
                <p className="fg-cyan">
                    NEXT: <span className="fg-white">{nextParty.eventName}</span> {nextParty.number}
                </p>
            )}
        </TeletextPage>
    );
}
