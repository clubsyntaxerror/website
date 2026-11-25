import type { Metadata } from "next";
import { PAGES } from "../../../themes/teletext/directory";
import { Gap, RichText, TeletextPage, TitleBar } from "../../../themes/teletext/ui";
import { faqMetadata } from "../../../content/metadata";
import { faqSchema, faqs } from "../../../content/faq";

export const metadata: Metadata = faqMetadata;

export default function FaqPage() {
    return (
        <TeletextPage number={PAGES.faq.number}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <TitleBar>FAQ</TitleBar>
            <p className="fg-white">Tap a question to read the answer.</p>
            <Gap />
            {faqs.map((faq, i) => (
                <details key={faq.question} className="tt-faq">
                    <summary>
                        <span className="tt-faq-no">{PAGES.faq.number + i + 1}</span>
                        <span>{faq.question}</span>
                    </summary>
                    <p className="tt-faq-a">
                        <RichText text={faq.answer} />
                    </p>
                </details>
            ))}
        </TeletextPage>
    );
}
