import type { Metadata } from "next";
import { PAGES } from "../../../themes/teletext/directory";
import { Button, DH, Gap, Rule, TeletextPage, TitleBar } from "../../../themes/teletext/ui";
import { Photo } from "../../../themes/teletext/photos";
import { aboutMetadata } from "../../../content/metadata";
import { organizationSchema } from "../../../content/organization";
import { DISCORD_URL, EMAIL, about, intro } from "../../../content/site";

export const metadata: Metadata = aboutMetadata;

export default function AboutPage() {
    return (
        <TeletextPage number={PAGES.about.number}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <TitleBar bg="cyan" color="black">
                ABOUT SYNTAX ERROR
            </TitleBar>
            <Photo name="dancefloor" />
            {[...intro, ...about.more].map((p) => (
                <p key={p}>{p}</p>
            ))}
            <Gap />
            <DH as="h2" color="yellow">
                THE ORGANIZATION
            </DH>
            {about.organization.map((p) => (
                <p key={p} className="fg-cyan">
                    {p}
                </p>
            ))}
            <Gap />
            <DH as="h2" color="magenta">
                HISTORY
            </DH>
            <Rule color="magenta" />
            {about.history.map((h) => (
                <section key={h.version}>
                    <h3 className="fg-yellow">{h.version.toUpperCase()}</h3>
                    <p>{h.text}</p>
                </section>
            ))}
            <Gap />
            <DH as="h2" color="green">
                GET INVOLVED
            </DH>
            <Gap />
            <Button href={DISCORD_URL} external bg="magenta" color="white">
                CHAT & VOLUNTEER ON DISCORD
            </Button>
            <Button href={`mailto:${EMAIL}`} bg="blue" color="white">
                EMAIL US: LIVE ACTS & CO-OPS
            </Button>
            <Button href={PAGES.faq.href} bg="yellow">
                {PAGES.faq.number} READ THE FAQ
            </Button>
        </TeletextPage>
    );
}
