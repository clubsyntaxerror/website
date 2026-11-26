import type { Metadata } from "next";
import { Heading, RichText, Room } from "../../../themes/adventure/ui";
import { rulesMetadata } from "../../../content/metadata";
import { rules } from "../../../content/site";

export const metadata: Metadata = rulesMetadata;

const LAWS = ["I", "II", "III"];

export default function GuardPost() {
    return (
        <Room id="guards">
            <p className="fg-yellow">THE CODE: {rules.lead}.</p>
            {rules.sections.map((section, i) => (
                <section key={section.heading}>
                    <Heading color="lightRed">
                        LAW {LAWS[i] ?? i + 1}: {section.heading.toUpperCase()}
                    </Heading>
                    {section.paragraphs.map((p) => (
                        <p key={p}>
                            <RichText text={p} />
                        </p>
                    ))}
                </section>
            ))}
        </Room>
    );
}
