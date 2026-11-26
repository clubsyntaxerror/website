import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvents } from "../../../eventData";
import BlockArt from "../../../../themes/adventure/BlockArt";
import { eventBanner } from "../../../../themes/adventure/banner";
import { Countdown } from "../../../../themes/adventure/client";
import { Button, Facts, Heading, Room } from "../../../../themes/adventure/ui";
import {
    directionsUrl,
    eventAddress,
    eventSlug,
    getQuests,
    nextQuest,
    price,
    shortDayMonth,
    shortWeekday,
} from "../../../../themes/adventure/world";
import { eventSchema } from "../../../../content/eventSchema";

type Params = { params: Promise<{ slug: string }> };

async function findQuest(slug: string) {
    const quests = await getQuests();
    const listed = quests.find((q) => q.slug === slug);
    if (listed) return { event: listed, number: listed.number, quests, past: false };
    const any = (await getEvents()).find((e) => !isNaN(e.startDate.getTime()) && eventSlug(e) === slug);
    if (!any) return undefined;
    return { event: any, number: undefined, quests, past: new Date(any.endDate) < new Date() };
}

export async function generateStaticParams() {
    return (await getQuests()).map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const found = await findQuest(slug);
    if (!found) return {};
    const { event } = found;
    return {
        title: `${event.eventName} – ${event.longDate} – Club Syntax Error`,
        description: event.eventDescription,
        alternates: { canonical: `https://www.syntax-error.se/dungeon/party/${slug}` },
    };
}

export default async function QuestPage({ params }: Params) {
    const { slug } = await params;
    const found = await findQuest(slug);
    if (!found) notFound();
    const { event, number, quests, past } = found;
    const isNext = nextQuest(quests)?.slug === slug;
    const banner = eventBanner(event.eventName, event.eventDescription, event.startDate, slug);
    const address = eventAddress(event);
    const directions = directionsUrl(event);
    const tickets = !past && event.optionalCallToActionUrl ? event.optionalCallToActionUrl : undefined;
    const later = number !== undefined ? quests.find((q) => q.number === number + 1) : undefined;

    return (
        <Room id={isNext ? "dance" : "quests"} title={number ? `Quest ${number}` : "An old scroll"} describe={false}>
            {!past && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(event)) }}
                />
            )}
            {banner && <BlockArt bitmap={banner} />}
            <Heading as="h2" color="white">
                {event.eventName}
            </Heading>
            {past && <p className="bg-red fg-white">This quest is over. See the quest board for new ones.</p>}
            <Facts
                items={[
                    ["WHEN", `${shortWeekday(event)} ${shortDayMonth(event)} ${event.startDate.getFullYear()}`],
                    ["TIME", event.openingHours],
                    ["WHERE", address ? `${event.venueName}, ${address}` : event.venueName],
                    [
                        "ENTRY",
                        <span key="fee" className="fg-lightGreen">
                            {price(event)}
                        </span>,
                    ],
                    ...(event.optionalAgeLimit ? [["MIN LVL", `${event.optionalAgeLimit}+`] as [string, string]] : []),
                ]}
            />
            {!past && (
                <p className="fg-lightGreen">
                    <Countdown start={event.startDate.toISOString()} end={new Date(event.endDate).toISOString()} />
                </p>
            )}
            <div>
                {event.eventDescription.split(/\n+/).map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                ))}
            </div>
            <div>
                {tickets && (
                    <Button href={tickets} external>
                        &gt; TAKE QUEST: {(event.optionalCallToActionTitle || "Buy tickets").toUpperCase()}
                    </Button>
                )}
                {directions && (
                    <Button href={directions} external bg="cyan">
                        &gt; MAP TO THE DUNGEON
                    </Button>
                )}
                {event.optionalFacebookEventUrl && (
                    <Button href={event.optionalFacebookEventUrl} external bg="lightBlue" color="white">
                        &gt; FACEBOOK EVENT
                    </Button>
                )}
            </div>
            {later && (
                <p>
                    <span className="fg-lightBlue">NEXT SCROLL: </span>
                    <Link href={later.href}>
                        {later.number}. {later.eventName}
                    </Link>
                </p>
            )}
        </Room>
    );
}
