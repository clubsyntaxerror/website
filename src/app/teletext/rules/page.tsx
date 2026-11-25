import type { Metadata } from "next";
import { PAGES } from "../../../themes/teletext/directory";
import { DH, Gap, RichText, TeletextPage, TitleBar } from "../../../themes/teletext/ui";
import { rulesMetadata } from "../../../content/metadata";
import { rules } from "../../../content/site";

export const metadata: Metadata = rulesMetadata;

export default function RulesPage() {
    return (
        <TeletextPage number={PAGES.rules.number}>
            <TitleBar bg="red" color="white">
                HOUSE RULES
            </TitleBar>
            <p className="fg-yellow">{rules.lead}.</p>
            <Gap />
            {rules.sections.map((section, i) => (
                <section key={section.heading}>
                    <DH as="h2" color="cyan">
                        {i + 1}. {section.heading.toUpperCase()}
                    </DH>
                    {section.paragraphs.map((p) => (
                        <p key={p}>
                            <RichText text={p} />
                        </p>
                    ))}
                    <Gap />
                </section>
            ))}
        </TeletextPage>
    );
}
