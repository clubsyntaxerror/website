import { Metadata } from "next";
import { faqMetadata } from "../../../content/metadata";
import { faqSchema, faqs } from "../../../content/faq";
import Footer from "../../../components/footer";

export const metadata: Metadata = faqMetadata;

export default function FaqPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <main className="flex min-h-screen flex-col items-center pt-16">
                <section className="p-6 w-full md:w-2/3">
                    <h1 className="arcade-header text-center mb-8">Frequently Asked Questions</h1>
                    {faqs.map((faq) => (
                        <details key={faq.question} className="rules-panel">
                            <summary>
                                <span className="rules-arrow">▶</span>
                                {faq.question}
                            </summary>
                            <div className="rules-body">
                                <p>{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </section>
                <Footer />
            </main>
        </>
    );
}
