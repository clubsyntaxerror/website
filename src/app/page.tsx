import Link from "next/link";
import { getEvents } from "./eventData";
import { getVideos } from "./youtubeData";
import Hero from "../components/hero";
import Events from "../components/events";
import Videos from "../components/videos";
import Photos from "../components/photos";
import Crew from "../components/crew";
import Rules from "../components/rules";
import Links from "../components/links";
import Sponsors from "../components/sponsors";

export default async function Home() {
    const events = (await getEvents())
        .filter((event) => {
            return event.startDate >= new Date();
        })
        .slice(0, 7);
    const videos = await getVideos();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Hero featuredEvent={events.filter((event) => !event.optionalHideFromHero)[0]} />
            <section id="events" className="p-6 md:pt-12 w-full md:w-2/3">
                <Events events={events.slice(0, 6)} />
            </section>
            <section className="w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag">
                <div className="p-6 md:py-12 md:w-2/3 md:text-xl">
                    <h2 className="text-black text-center mb-4">About us</h2>
                    <p>
                        Welcome to Stockholm's monthly Video Game Party & Nightclub! Dance the night away to video game
                        music and play brand-new or retro video games – all in our uniquely warm and accepting
                        atmosphere.
                    </p>
                    <p>
                        Syntax Error is a party and a nightclub where you'll be in good company if you enjoy playing
                        Street Fighter or Duck Hunt, dancing to video game music, Disney classics and C64 SIDs or simply
                        hiding in the back room playing Magic or any of our other board games all night.
                    </p>
                </div>
            </section>
            <section>
                <h2 className="text-white text-center my-4">Between events</h2>
                <div className="w-full text-center mb-4">
                    <Link href="https://discord.gg/URhqp3x" target="_blank" className="button bg-white text-black">
                        Join our Discord
                    </Link>
                </div>
            </section>
            <section className="p-6 md:py-12 w-full md:w-2/3">
                <h2 className="text-white text-center mb-4">Latest videos</h2>
                <Videos videos={videos} />
            </section>
            <section className="p-6 md:py-12 w-full md:w-2/3">
                <h2 className="text-white text-center mb-4">Photo gallery</h2>
                <Photos />
            </section>
            <section className="p-6 w-full md:w-2/3">
                <Crew />
            </section>
            <section className="p-6 w-full md:w-2/3">
                <h2 className="text-white text-center mb-4">Booked artists</h2>
                <img src="/photos/artists.jpg" className="mb-4" alt="Artist playing at Syntax Error" />
                <p className="text-gray-500">
                    This is a list of awesome artists that has played at our clubs or concerts in the past.
                </p>
                <p className="rainbow_text_animated">
                    047, Algar, Bitvortex, Blastromen, Bossfight, Boy vs Bacteria, Brandon Walsh, Chipzel, Cyanide
                    Dansen, Dual Core, Dubmood, Dunderpatrullen, DJ Diskmachine, FantomenK, Fastbom, FsFreak, Goto80,
                    Hello World, Instant Remedy, Irving Force, Jeroen Tel, laamaa, Lizard King, Maktone, MegaNeko,
                    Moogen, Ninjaspark, Nordloef, Powerplay, RoccoW, Rymdkraft, SabrePulse, Savlonic, Shirobon,
                    Starchild, Tekmann, Thermostatic, Ultrasyd, USK, Wiklund, Zabutom, Zalza
                </p>
            </section>
            <section className="p-6 w-full md:w-2/3">
                <Links />
            </section>
            <section className="p-6 w-full md:w-2/3">
                <Sponsors />
            </section>
            <footer className="p-6 w-full md:w-2/3">
                <img src="/images/invader-dance.gif" className="motion-reduce:hidden" aria-hidden={true} />
                <img src="/images/invader-logo.png" className="motion-safe:hidden" aria-hidden={true} />
                <h2 className="text-gray-500 text-center">
                    Svenska Spelmusikfrämjandet © 2002-{new Date().getFullYear()}
                </h2>
                <p className="text-gray-500 text-center">
                    Email us at{" "}
                    <Link href="mailto:info@syntax-error.se" className="smallbutton mr-2">
                        info@syntax-error.se
                    </Link>{" "}
                    or message us on our{" "}
                    <Link
                        href="https://www.facebook.com/SyntaxErrorSthlm/"
                        target="_blank"
                        className="smallbutton mr-2"
                    >
                        Facebook Page
                    </Link>{" "}
                    for questions, ideas, corporate and co-op events
                </p>
            </footer>
            <section className="p-6 w-full md:w-2/3">
                <Rules />
            </section>
        </main>
    );
}
