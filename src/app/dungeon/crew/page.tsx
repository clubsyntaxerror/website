import type { Metadata } from "next";
import Photo from "../../../themes/adventure/Photo";
import { Button, Heading, Room } from "../../../themes/adventure/ui";
import type { ColorName } from "../../../themes/adventure/palette";
import { MERCH_URL, SPOTIFY_URL, artists, crew } from "../../../content/site";

export const metadata: Metadata = {
    title: "Crew & Artists – Club Syntax Error",
    description: "The volunteer crew behind Club Syntax Error and the artists who have played our clubs and concerts.",
    alternates: { canonical: "https://www.syntax-error.se/dungeon/crew" },
};

/** Every crew role gets an RPG class. */
const CLASSES: Record<string, string> = {
    Crew: "Adventurers",
    DJs: "Bards",
    VJs: "Illusionists",
    Board: "High council",
    Alumni: "Legends of old",
};

const cycle: ColorName[] = ["yellow", "cyan", "lightGreen", "lightRed", "white", "orange"];

export default function GuildHall() {
    return (
        <Room id="guild">
            <Photo name="crew" />
            <p>
                Syntax Error is run by the non-profit organization Svenska Spelmusikfrämjandet, whose members organize
                all our events together with volunteers.
            </p>
            {crew.map((group) => (
                <section key={group.name}>
                    <Heading color="yellow">{(CLASSES[group.name] ?? group.name).toUpperCase()}</Heading>
                    <p className="fg-lightBlue">({group.name})</p>
                    <p className="fg-white">{group.members}</p>
                </section>
            ))}
            <section>
                <Heading color="lightRed">VISITING BARDS</Heading>
                <Photo name="artists" />
                <p>Artists who have played our clubs and concerts:</p>
                <p>
                    {artists.map((name, i) => (
                        <span key={name} className={`fg-${cycle[i % cycle.length]}`}>
                            {name}
                            {i < artists.length - 1 ? ", " : ""}
                        </span>
                    ))}
                </p>
            </section>
            <div>
                <Button href={SPOTIFY_URL} external bg="green" color="white">
                    &gt; HEAR THE BARDS ON SPOTIFY
                </Button>
                <Button href={MERCH_URL} external bg="yellow">
                    &gt; GUILD MERCH
                </Button>
            </div>
        </Room>
    );
}
