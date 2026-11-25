import type { Metadata } from "next";
import { PAGES, getUpcomingEvents, price } from "../../../themes/teletext/directory";
import { Button, Gap, Leader, TeletextPage, TitleBar } from "../../../themes/teletext/ui";
import { eventSchema } from "../../../content/eventSchema";

export const metadata: Metadata = {
    title: "Party Calendar – Club Syntax Error",
    description: "Upcoming Club Syntax Error parties in Stockholm: dates, venues, entry prices and tickets.",
    alternates: { canonical: "https://www.syntax-error.se/parties" },
};

export default async function PartiesPage() {
    const events = await getUpcomingEvents();
    return (
        <TeletextPage number={PAGES.parties.number}>
            {events.map((event) => (
                <script
                    key={event.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(event)) }}
                />
            ))}
            <TitleBar bg="green" color="black">
                PARTY CALENDAR
            </TitleBar>
            <Gap />
            {events.length === 0 && <p>No parties scheduled right now. Check back soon!</p>}
            {events.map((event, i) => (
                <Leader
                    key={event.slug}
                    href={event.href}
                    label={`${event.shortDate.padEnd(5)} ${event.eventName}`}
                    page={event.number}
                    color={i % 2 ? "cyan" : "yellow"}
                    sub={
                        <span className="tt-indent" style={{ paddingLeft: "6ch", display: "block" }}>
                            {event.venueName} · {price(event)}
                        </span>
                    }
                />
            ))}
            <Gap />
            <p className="fg-white">Never miss a party:</p>
            <Button href={PAGES.newsletter.href} bg="yellow">
                {PAGES.newsletter.number} PARTY NEWSLETTER
            </Button>
        </TeletextPage>
    );
}
