import { Metadata } from "next";
import { aboutMetadata } from "../../../content/metadata";
import { organizationSchema } from "../../../content/organization";
import Link from "next/link";
import { Fragment } from "react";
import { DISCORD_URL, EMAIL, about, intro } from "../../../content/site";
import Footer from "../../../components/footer";

export const metadata: Metadata = aboutMetadata;

const ORGANIZATION = "Svenska Spelmusikfrämjandet";

export default function AboutPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <main className="flex min-h-screen flex-col items-center pt-16">
                <section className="w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag">
                    <div className="p-6 md:py-12 md:w-2/3 md:text-xl">
                        <h1 className="text-black text-center mb-4">About Club Syntax Error</h1>
                        {[...intro, ...about.more].map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </section>

                <section className="p-6 w-full md:w-2/3">
                    <h2 className="text-center mb-4">Svenska Spelmusikfrämjandet</h2>
                    <div className="text-gray-500">
                        {about.organization.map((paragraph) => (
                            <p key={paragraph}>
                                {paragraph.split(ORGANIZATION).map((part, i) => (
                                    <Fragment key={i}>
                                        {i > 0 && <strong>{ORGANIZATION}</strong>}
                                        {part}
                                    </Fragment>
                                ))}
                            </p>
                        ))}
                    </div>
                </section>

                <section className="p-6 w-full md:w-2/3">
                    <h2 className="text-center mb-4">History</h2>
                    <div className="text-gray-500">
                        {about.history.map((entry) => (
                            <Fragment key={entry.version}>
                                <h3>{entry.version}</h3>
                                <p>{entry.text}</p>
                            </Fragment>
                        ))}
                    </div>
                </section>

                <section className="p-6 w-full md:w-2/3">
                    <div className="arcade-screen">
                        <div className="arcade-scanlines" aria-hidden="true" />
                        <h2 className="arcade-header">
                            <span className="blink">&#x2B25;</span> GET INVOLVED <span className="blink">&#x2B25;</span>
                        </h2>
                        <nav className="arcade-menu">
                            <Link href={DISCORD_URL} target="_blank" className="arcade-item">
                                <img src="/social/discord.svg" aria-hidden="true" alt="" />
                                <span>Join our Discord to chat and volunteer</span>
                            </Link>
                            <Link href={`mailto:${EMAIL}`} className="arcade-item">
                                <img src="/social/github.svg" aria-hidden="true" alt="" />
                                <span>Email us about live acts and co-ops</span>
                            </Link>
                            <Link href="/faq" className="arcade-item">
                                <span>&#x2753; Read the FAQ</span>
                            </Link>
                        </nav>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
