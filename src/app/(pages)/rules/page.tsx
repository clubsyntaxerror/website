import { Metadata } from "next";
import { rulesMetadata } from "../../../content/metadata";
import Link from "next/link";
import { Fragment } from "react";
import { EMAIL, rules } from "../../../content/site";
import Footer from "../../../components/footer";

export const metadata: Metadata = rulesMetadata;

export default function CodeOfConductPage() {
    return (
        <main className="flex min-h-screen flex-col items-center pt-16">
            <section className="w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag">
                <div className="p-6 md:py-12 md:w-2/3">
                    <h1 className="text-black text-center mb-2">Rules</h1>
                    <p className="text-center text-sm opacity-70 mb-0">{rules.lead}</p>
                </div>
            </section>

            {rules.sections.map((section) => (
                <section key={section.heading} className="p-6 w-full md:w-2/3">
                    <h3>{section.heading}</h3>
                    <div className="text-gray-500">
                        {section.paragraphs.map((paragraph) => (
                            <p key={paragraph}>
                                {paragraph.split(EMAIL).map((part, i) => (
                                    <Fragment key={i}>
                                        {i > 0 && (
                                            <Link href={`mailto:${EMAIL}`} className="smallbutton">
                                                {EMAIL}
                                            </Link>
                                        )}
                                        {part}
                                    </Fragment>
                                ))}
                            </p>
                        ))}
                    </div>
                </section>
            ))}

            <Footer />
        </main>
    );
}
