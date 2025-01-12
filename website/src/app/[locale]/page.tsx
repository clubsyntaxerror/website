import Link from "next/link";
import Hero from "../../components/hero";
import Events from "../../components/events";
import Photos from "../../components/photos";
import Crew from "../../components/crew";
import Rules from "../../components/rules";
import Links from "../../components/links";
import { getTranslations } from "next-intl/server";
import { db, schema } from "database";
import { cache } from "react";
import { gte, sql, asc } from "drizzle-orm";

const getEvents = cache(async () => {
    return db.query.events.findMany({
        where: gte(schema.events.eventStart, sql`now()`),
        orderBy: asc(schema.events.eventStart),
        limit: 7,
        with: {
            callToAction: true,
        },
    });
});

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const events = await getEvents();

    const t = await getTranslations("Home");

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Hero featuredEvent={events[0]} locale={(await params).locale} />
            <section id="events" className="p-6 md:pt-12 w-full md:w-2/3">
                <Events events={events.slice(0, 6)} />
            </section>
            <section className="w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag">
                <div className="p-6 md:py-12 md:w-2/3 md:text-xl">
                    <h2 className="text-black text-center mb-4">{t("aboutUs")}</h2>
                    <p>{t("welcome")}</p>
                    <p>{t("partyAndNightClub")}</p>
                </div>
            </section>
            <section>
                <h2 className="text-white text-center my-4">{t("dontGoAlone")}</h2>
                <div className="w-full text-center mb-4">
                    <Link href="https://discord.gg/URhqp3x" target="_blank" className="button bg-white text-black">
                        {t("joinOurDiscord")}
                    </Link>
                </div>
            </section>
            <section className="p-6 md:py-12 w-full md:w-2/3">
                <Photos />
            </section>
            <section className="p-6 w-full md:w-2/3">
                <Crew />
            </section>
            <section className="p-6 w-full md:w-2/3">
                <h2 className="text-white text-center mb-4">{t("bookedArtists")}</h2>
                <img src="/photos/artists.jpg" className="mb-4" alt="Artist playing at Syntax Error" />
                <p className="text-gray-500">{t("bookedArtistsDescription")}</p>
                <p className="rainbow_text_animated">
                    047, Algar, Blastromen, Bossfight, Boy vs Bacteria, Brandon Walsh, Chipzel, Dubmood,
                    Dunderpatrullen, DJ Diskmachine, FantomenK, Fastbom, Goto80, Hello World, Instant Remedy, Irving
                    Force, Jeroen Tel, Maktone, MegaNeko, Moogen, Ninjaspark, Nordloef, Powerplay, RoccoW, Rymdkraft,
                    SabrePulse, Savlonic, Shirobon, Starchild, Tekmann, Thermostatic, Ultrasyd, USK, Wiklund, Zabutom,
                    Zalza
                </p>
            </section>
            <section className="p-6 w-full md:w-2/3">
                <Links />
            </section>
            <footer className="p-6 w-full md:w-2/3">
                <img src="/images/invader-dance.gif" className="motion-reduce:hidden" aria-hidden={true} />
                <img src="/images/invader-logo.png" className="motion-safe:hidden" aria-hidden={true} />
                <h2 className="text-gray-500 text-center">
                    Svenska Spelmusikfrämjandet © 2002-{new Date().getFullYear()}
                </h2>
                <p className="text-gray-500 text-center">
                    {t("emailUs") + " "}
                    <Link href="mailto:info@syntax-error.se" className="smallbutton mr-2">
                        info@syntax-error.se
                    </Link>
                    {" " + t("orMessageUs") + " "}
                    <Link
                        href="https://www.facebook.com/SyntaxErrorSthlm/"
                        target="_blank"
                        className="smallbutton mr-2"
                    >
                        {t("facebookPage")}
                    </Link>{" "}
                    {t("forQuestions")}
                </p>
            </footer>
            <section className="p-6 w-full md:w-2/3">
                <Rules />
            </section>
        </main>
    );
}
