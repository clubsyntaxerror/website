import type { Metadata } from "next";
import { PAGES } from "../../../themes/teletext/directory";
import { Button, DH, Gap, TeletextPage, TitleBar } from "../../../themes/teletext/ui";
import { MERCH_URL, SPOTIFY_URL, artists, crew } from "../../../content/site";

export const metadata: Metadata = {
    title: "Crew & Artists – Club Syntax Error",
    description: "The volunteer crew behind Club Syntax Error and the artists who have played our clubs and concerts.",
    alternates: { canonical: "https://www.syntax-error.se/crew" },
};

const cycle = ["yellow", "cyan", "green", "magenta", "white", "red"] as const;

export default function CrewPage() {
    return (
        <TeletextPage number={PAGES.crew.number}>
            <TitleBar bg="green" color="black">
                CREW & ARTISTS
            </TitleBar>
            <Gap />
            <p>
                Syntax Error is run by the non-profit organization Svenska Spelmusikfrämjandet whose members organize
                all our events together with volunteers.
            </p>
            {crew.map((group) => (
                <section key={group.name}>
                    <h2 className="fg-yellow">{group.name.toUpperCase()}</h2>
                    <p className="fg-cyan">{group.members}</p>
                </section>
            ))}
            <Gap />
            <DH as="h2" color="magenta">
                ARTISTS WHO PLAYED
            </DH>
            <p>
                {artists.map((name, i) => (
                    <span key={name} className={`fg-${cycle[i % cycle.length]}`}>
                        {name}
                        {i < artists.length - 1 ? " " : ""}
                    </span>
                ))}
            </p>
            <Gap />
            <Button href={SPOTIFY_URL} external bg="green">
                SOUNDS OF SYNTAX ERROR
            </Button>
            <Button href={MERCH_URL} external bg="white">
                GET OUR MERCH
            </Button>
        </TeletextPage>
    );
}
