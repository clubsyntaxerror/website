import type { Metadata } from "next";
import { Suspense } from "react";
import { OracleAnswer } from "../../../themes/adventure/client";
import { RichText, Room } from "../../../themes/adventure/ui";
import { faqMetadata } from "../../../content/metadata";
import { faqSchema, faqs } from "../../../content/faq";

export const metadata: Metadata = faqMetadata;

export default function Oracle() {
    return (
        <Room id="oracle">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <p className="fg-lightBlue">Type ASK and your question, e.g. ASK AGE LIMIT. Or tap a scroll.</p>
            <Suspense fallback={null}>
                <OracleAnswer faqs={faqs} />
            </Suspense>
            <div>
                {faqs.map((faq, i) => (
                    <details key={faq.question} className="adv-scroll" id={`scroll-${i + 1}`}>
                        <summary>
                            <span className="fg-purple">{i + 1}.</span>
                            <span>{faq.question}</span>
                        </summary>
                        <p className="adv-scroll-answer">
                            <RichText text={faq.answer} />
                        </p>
                    </details>
                ))}
            </div>
        </Room>
    );
}
