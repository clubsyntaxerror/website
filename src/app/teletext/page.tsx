import Link from "next/link";
import Mosaic from "../../themes/teletext/MosaicArt";
import { logoBanner } from "../../themes/teletext/banner";
import { Countdown, Ticker } from "../../themes/teletext/client";
import { PAGES, getUpcomingEvents, price, shortDayMonth, shortWeekday } from "../../themes/teletext/directory";
import { Button, DH, Gap, Leader, Rule, TeletextPage } from "../../themes/teletext/ui";
import { eventSchema } from "../../content/eventSchema";
import { socialProofs, sponsors, tagline } from "../../content/site";

const index = [
    { ...PAGES.parties, label: "Party calendar", color: "green" },
    { ...PAGES.about, label: "About & history", color: "cyan" },
    { ...PAGES.faq, label: "FAQ", color: "cyan" },
    { ...PAGES.rules, label: "House rules", color: "cyan" },
    { ...PAGES.newsletter, label: "Party newsletter", color: "yellow" },
    { ...PAGES.links, label: "Warp zone", color: "magenta" },
    { ...PAGES.crew, label: "Crew & artists", color: "magenta" },
] as const;

export default async function TeletextHome() {
    const events = await getUpcomingEvents();
    const next = events.find((e) => !e.optionalHideFromHero) ?? events[0];
    const { bitmap, cursor } = logoBanner();

    return (
        <TeletextPage number={PAGES.index.number}>
            {events.map((event) => (
                <script
                    key={event.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(event)) }}
                />
            ))}
            <h1>
                <Mosaic bitmap={bitmap} label="Syntax Error">
                    <rect className="c7 tt-flash" x={cursor.x} y={cursor.y} width={cursor.w} height={cursor.h} />
                </Mosaic>
            </h1>
            <p className="tt-center fg-cyan tt-tight">{tagline.toUpperCase()}</p>
            <p className="tt-center fg-white">VIDEO GAMES · CHIPTUNES · NICE PEOPLE</p>
            <Gap />

            {next ? (
                <section aria-labelledby="next-party">
                    <DH bg="magenta" color="white">
                        <span id="next-party"> NEXT PARTY </span>
                        <span className="fg-yellow">{next.number}</span>
                    </DH>
                    <Link href={next.href} className="tt-leader">
                        <DH color="yellow">
                            {shortWeekday(next)} {shortDayMonth(next)}
                        </DH>
                        <span className="tt-leader-row fg-white">{next.eventName}</span>
                        <span className="tt-leader-sub">
                            {next.openingHours} · {next.venueName} · {price(next)}
                            {next.optionalAgeLimit && ` · ${next.optionalAgeLimit}+`}
                        </span>
                        <span className="tt-leader-sub fg-green">
                            <Countdown
                                start={next.startDate.toISOString()}
                                end={new Date(next.endDate).toISOString()}
                            />
                        </span>
                    </Link>
                    {next.optionalCallToActionUrl && (
                        <Button href={next.optionalCallToActionUrl} external big>
                            {">> "}
                            {(next.optionalCallToActionTitle || "Tickets").toUpperCase()}
                            {" <<"}
                        </Button>
                    )}
                </section>
            ) : (
                <section>
                    <DH color="yellow">NO PARTIES SCHEDULED</DH>
                    <p>New dates are announced in the newsletter first.</p>
                    <Button href={PAGES.newsletter.href} big>
                        GET THE NEWSLETTER
                    </Button>
                </section>
            )}

            <nav aria-label="Index">
                <DH as="h2" bg="blue" color="yellow">
                    {" "}
                    INDEX
                </DH>
                <Gap />
                {index.map((item) => (
                    <Leader
                        key={item.number}
                        href={item.href}
                        label={item.label}
                        page={item.number}
                        color={item.color}
                    />
                ))}
            </nav>

            <Rule color="magenta" />
            <h2 className="fg-yellow">WORD ON THE STREET</h2>
            <Ticker items={socialProofs} />
            <Gap />
            <p className="fg-white">
                SPONSORED BY{" "}
                {sponsors.map((s) => (
                    <a key={s.name} className="tt-link" href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.name.toUpperCase()}
                    </a>
                ))}
            </p>
        </TeletextPage>
    );
}
