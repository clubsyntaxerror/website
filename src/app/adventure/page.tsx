import Link from "next/link";
import BlockArt from "../../themes/adventure/BlockArt";
import { logoBanner } from "../../themes/adventure/banner";
import { Boot, Countdown, Rumours } from "../../themes/adventure/client";
import { HEX } from "../../themes/adventure/palette";
import { Button, Facts, Heading, Room } from "../../themes/adventure/ui";
import { getQuests, nextQuest, price, shortDayMonth, shortWeekday } from "../../themes/adventure/world";
import { eventSchema } from "../../content/eventSchema";
import { socialProofQuotes, sponsors, tagline } from "../../content/site";

// English only, and no emoji: the C64 had neither.
const rumours = socialProofQuotes
    .filter((quote) => !quote.sv)
    .map((quote) => quote.text.replace(/\s*\p{Extended_Pictographic}/gu, ""));

export default async function Entrance() {
    const quests = await getQuests();
    const next = nextQuest(quests);
    const { bitmap, cursor } = logoBanner();

    return (
        <Room
            id="entrance"
            before={
                <>
                    <Boot />
                    {quests.map((quest) => (
                        <script
                            key={quest.slug}
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(quest)) }}
                        />
                    ))}
                    <h1>
                        <BlockArt bitmap={bitmap} label="Syntax Error">
                            <rect
                                className="adv-blink"
                                x={cursor.x}
                                y={cursor.y}
                                width={cursor.w}
                                height={cursor.h}
                                fill={HEX.lightBlue}
                            />
                        </BlockArt>
                    </h1>
                    <p className="fg-cyan">{tagline}. Video games, chiptunes and nice people since 2002.</p>
                </>
            }
        >
            {next ? (
                <section aria-labelledby="next-quest">
                    <Heading id="next-quest" color="lightGreen">
                        YOUR NEXT QUEST
                    </Heading>
                    <p className="fg-white">
                        <Link href={next.href}>{next.eventName}</Link>
                    </p>
                    <Facts
                        items={[
                            ["WHEN", `${shortWeekday(next)} ${shortDayMonth(next)} ${next.openingHours}`],
                            ["WHERE", next.venueName],
                            ["ENTRY", price(next)],
                            ...(next.optionalAgeLimit
                                ? [["MIN LVL", `${next.optionalAgeLimit}+`] as [string, string]]
                                : []),
                        ]}
                    />
                    <p className="fg-lightGreen">
                        <Countdown start={next.startDate.toISOString()} end={new Date(next.endDate).toISOString()} />
                    </p>
                    {next.optionalCallToActionUrl ? (
                        <Button href={next.optionalCallToActionUrl} external>
                            &gt; TAKE QUEST: {(next.optionalCallToActionTitle || "Buy tickets").toUpperCase()}
                        </Button>
                    ) : (
                        <Button href={next.href}>&gt; READ THE QUEST</Button>
                    )}
                </section>
            ) : (
                <section>
                    <Heading color="lightGreen">NO QUESTS POSTED</Heading>
                    <p>New quests are announced by raven first.</p>
                    <Button href="/newsletter">&gt; VISIT THE RAVEN ROOST</Button>
                </section>
            )}

            <section aria-labelledby="rumours">
                <Heading id="rumours" color="cyan">
                    RUMOURS IN THE HALL
                </Heading>
                <Rumours items={rumours} />
            </section>

            <p className="fg-lightBlue">
                Patrons of the realm:{" "}
                {sponsors.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.name}
                    </a>
                ))}
            </p>
            <p className="fg-lightBlue">Type HELP and press RETURN for commands.</p>
        </Room>
    );
}
