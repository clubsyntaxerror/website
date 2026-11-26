import type { Metadata } from "next";
import Link from "next/link";
import { Button, Room } from "../../../themes/adventure/ui";
import { getQuests, price } from "../../../themes/adventure/world";
import { eventSchema } from "../../../content/eventSchema";

export const metadata: Metadata = {
    title: "Party Calendar – Club Syntax Error",
    description: "Upcoming Club Syntax Error parties in Stockholm: dates, venues, entry prices and tickets.",
    alternates: { canonical: "https://www.syntax-error.se/parties" },
};

export default async function QuestBoard() {
    const quests = await getQuests();
    return (
        <Room id="quests">
            {quests.map((quest) => (
                <script
                    key={quest.slug}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(quest)) }}
                />
            ))}
            {quests.length === 0 ? (
                <p>The board is empty. No parties are scheduled right now.</p>
            ) : (
                <ol className="adv-quests">
                    {quests.map((quest) => (
                        <li key={quest.slug}>
                            <Link href={quest.href}>
                                <span className="fg-yellow">{quest.number}.</span>
                                <span>
                                    <span className="fg-cyan">{quest.shortDate}</span>{" "}
                                    <span className="adv-quest-name">{quest.eventName}</span>
                                    <br />
                                    <span className="fg-lightBlue">
                                        {quest.venueName} · {price(quest)}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
            )}
            <p className="fg-lightBlue">Type READ and a number, or tap a scroll.</p>
            <Button href="/newsletter" bg="grey" color="white">
                &gt; NEVER MISS A QUEST: RAVEN ROOST
            </Button>
        </Room>
    );
}
