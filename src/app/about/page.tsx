import { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/footer";

export const metadata: Metadata = {
    title: "About – Club Syntax Error",
    description:
        "Learn about Club Syntax Error – Stockholm's monthly video game nightclub run by the non-profit Svenska Spelmusikfrämjandet since 2002. Find out how to get involved.",
    alternates: {
        canonical: "https://www.syntax-error.se/about",
    },
    openGraph: {
        siteName: "Club Syntax Error",
        title: "About – Club Syntax Error",
        description:
            "Learn about Club Syntax Error – Stockholm's monthly video game nightclub run by the non-profit Svenska Spelmusikfrämjandet since 2002.",
        url: "https://www.syntax-error.se/about",
        images: [
            {
                url: "https://www.syntax-error.se/video-poster.jpg",
                width: 1920,
                height: 1080,
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Club Syntax Error",
    alternateName: "Syntax Error",
    url: "https://www.syntax-error.se",
    logo: "https://www.syntax-error.se/images/logo.png",
    description:
        "Stockholm's monthly video game nightclub featuring gaming, board games, live music, and cosplay in a warm and accepting atmosphere. Run by the non-profit Svenska Spelmusikfrämjandet.",
    sameAs: [
        "https://www.facebook.com/clubsyntaxerror/",
        "https://www.instagram.com/clubsyntaxerror/",
        "https://tiktok.com/@clubsyntaxerror",
        "https://www.twitch.tv/clubsyntaxerror/videos/",
        "https://www.youtube.com/channel/UCitAIsd8SDH4omDTLpf5upg",
        "https://bsky.app/profile/clubsyntaxerror.bsky.social",
        "https://x.com/clubsyntaxerror",
        "https://github.com/clubsyntaxerror",
        "https://discord.gg/URhqp3x",
    ],
};

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
                        <p>
                            Welcome to Stockholm's monthly Video Game Party &amp; Nightclub! Dance the night away to
                            video game music and play brand-new or retro video games - all in our uniquely warm and
                            accepting atmosphere.
                        </p>
                        <p>
                            Syntax Error is a party and a nightclub where you'll be in good company if you enjoy playing
                            Street Fighter or Duck Hunt, dancing to video game music, Disney classics and C64 SIDs, or
                            simply hiding in the back room playing Magic or any of our other board games all night.
                        </p>
                        <p>
                            Between sets there's always something going on: compete in our quiz walk for a chance to win
                            prizes, build precarious towers with our giant Jenga or challenge strangers to a Quake 3
                            deathmatch on our Raspberry Pi LAN stations.
                        </p>
                        <p>
                            We take pride in being an inclusive space. Everyone is welcome regardless of gender, sexual
                            orientation, ethnicity, or religion. Our dedicated crew enforces a strict{" "}
                            <Link href="/#rules" className="smallbutton">
                                Code of Conduct
                            </Link>{" "}
                            to make sure every guest feels safe and respected.
                        </p>
                    </div>
                </section>

                <section className="p-6 w-full md:w-2/3">
                    <h2 className="text-center mb-4">Svenska Spelmusikfrämjandet</h2>
                    <div className="text-gray-500">
                        <p>
                            Club Syntax Error is run by <strong>Svenska Spelmusikfrämjandet</strong> (the Swedish
                            Association for the Promotion of Video Game Music), a non-profit organization founded in
                            2002. The association is entirely volunteer-run - everyone from the DJs to the crew members
                            gives their time freely because they love the community.
                        </p>
                        <p>
                            Over more than two decades the organization has grown from a small LAN-party crowd into a
                            beloved monthly institution in Stockholm's nightlife. Surplus from ticket sales goes back
                            into improving the event - better games, better equipment, better experiences for you.
                        </p>
                    </div>
                </section>

                <section className="p-6 w-full md:w-2/3">
                    <h2 className="text-center mb-4">History</h2>
                    <div className="text-gray-500">
                        <h3>Version 1.0 - 2002</h3>
                        <p>
                            Syntax Error started in 2002 when Jon Edlund and Christian Rehne wanted people to listen to
                            Instant Remedy when going out in Stockholm. They kicked things off at Soderkallaren using
                            Winamp and a laptop, together with a handful of enthusiastic nerds. The name was taken from
                            Thomas "Sol" Sunhedens fantastic radio show.
                        </p>
                        <h3>Version 2.0 - 2005</h3>
                        <p>
                            Between 2005 and 2008 the venue of choice was Grottan and the crew grew with new members.
                            After nearly a year of hiatus the club returned to Grottan with over 300 nerds, organized
                            live performances, LED throwie workshops, and secured three new DJs: Andreas Ahlborg, David
                            Edstrom and Nik Reiman.
                        </p>
                        <h3>Version 3.0 - 2009</h3>
                        <p>
                            In fall 2009 the club secured a Saturday each month at H62 on Mariatorget - the venue that
                            is still home today. The organization turned legit, registered as a non-profit, and kept
                            growing: more video games, lasers, epic performers like Dubmood and FantomenK, and the
                            beloved annual Halloween costume party. Collaborations followed with SEC-T, Gamer's Night,
                            Kodachicon and KarateGamers, and the club even rented the ballroom-like Bryggarsalen for a
                            Halloween special.
                        </p>
                        <h3>Version 4.0 - 2025</h3>
                        <p>
                            In 2025 we sent our our first ever annual survey to get feedback from our guests and learn
                            how to make the club even better. The response was overwhelming and we got tons of great
                            suggestions that we promptly started implementing.
                        </p>
                    </div>
                </section>

                <section className="p-6 w-full md:w-2/3">
                    <div className="arcade-screen">
                        <div className="arcade-scanlines" aria-hidden="true" />
                        <h2 className="arcade-header">
                            <span className="blink">&#x2B25;</span> GET INVOLVED <span className="blink">&#x2B25;</span>
                        </h2>
                        <nav className="arcade-menu">
                            <Link href="https://discord.gg/URhqp3x" target="_blank" className="arcade-item">
                                <img src="/social/discord.svg" aria-hidden="true" alt="" />
                                <span>Join our Discord to chat and volunteer</span>
                            </Link>
                            <Link href="mailto:info@syntax-error.se" className="arcade-item">
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
