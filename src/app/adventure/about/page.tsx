import type { Metadata } from "next";
import Photo from "../../../themes/adventure/Photo";
import { Button, Heading, Room } from "../../../themes/adventure/ui";
import { aboutMetadata } from "../../../content/metadata";
import { organizationSchema } from "../../../content/organization";
import { DISCORD_URL, EMAIL, about, intro } from "../../../content/site";

export const metadata: Metadata = aboutMetadata;

const TOMES = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function Archives() {
    return (
        <Room id="archive">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <Photo name="dancefloor" />
            <div>
                {[...intro, ...about.more].map((p) => (
                    <p key={p}>{p}</p>
                ))}
            </div>
            <section>
                <Heading color="yellow">THE ORDER</Heading>
                {about.organization.map((p) => (
                    <p key={p}>{p}</p>
                ))}
            </section>
            <section>
                <Heading color="orange">THE CHRONICLES</Heading>
                {about.history.map((entry, i) => (
                    <div key={entry.version} className="adv-tome">
                        <h3 className="fg-yellow">
                            TOME {TOMES[i] ?? i + 1}: {entry.version.toUpperCase()}
                        </h3>
                        <p>{entry.text}</p>
                    </div>
                ))}
            </section>
            <section>
                <Heading color="lightGreen">JOIN THE PARTY</Heading>
                <Button href={DISCORD_URL} external bg="purple" color="white">
                    &gt; CHAT AND VOLUNTEER ON DISCORD
                </Button>
                <Button href={`mailto:${EMAIL}`} bg="lightBlue" color="white">
                    &gt; EMAIL US: LIVE ACTS AND CO-OPS
                </Button>
            </section>
        </Room>
    );
}
