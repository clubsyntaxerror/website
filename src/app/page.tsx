import { getEvents } from "./eventData";
import { getVideos } from "./youtubeData";
import Hero from "../components/hero";
import Events from "../components/events";
import About from "../components/about";
import Videos from "../components/videos";
import Photos from "../components/photos";
import Crew from "../components/crew";
import Artists from "../components/artists";
import Rules from "../components/rules";
import Links from "../components/links";
import Sponsors from "../components/sponsors";
import Footer from "../components/footer";

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

export default async function Home() {
    const events = (await getEvents())
        .filter((event) => {
            return event.startDate >= new Date();
        })
        .slice(0, 7);
    const videos = await getVideos();

    const eventSchemas = events.map((event) => ({
        "@context": "https://schema.org",
        "@type": "MusicEvent",
        name: event.eventName,
        description: event.eventDescription,
        startDate: event.startDate.toISOString(),
        endDate: new Date(event.endDate).toISOString(),
        image: "https://www.syntax-error.se/video-poster.jpg",
        location: {
            "@type": "Place",
            name: event.venueName,
            address: {
                "@type": "PostalAddress",
                streetAddress: event.venueAddress,
                addressLocality: "Stockholm",
                addressCountry: "SE",
            },
        },
        organizer: {
            "@type": "Organization",
            name: "Club Syntax Error",
            url: "https://www.syntax-error.se",
        },
        ...(event.optionalCoverFee && {
            offers: {
                "@type": "Offer",
                description: event.optionalCoverFee,
                priceCurrency: "SEK",
                url: event.optionalCallToActionUrl ?? "https://www.syntax-error.se",
                availability: "https://schema.org/InStock",
            },
        }),
        ...(event.optionalFacebookEventUrl && { url: event.optionalFacebookEventUrl }),
        ...(event.optionalAgeLimit && { typicalAgeRange: `${event.optionalAgeLimit}+` }),
    }));

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            {eventSchemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <main className="flex min-h-screen flex-col items-center justify-between">
                <Hero featuredEvent={events.filter((event) => !event.optionalHideFromHero)[0]} />
                <Events events={events.slice(0, 6)} />
                <About />
                <Videos videos={videos} />
                <Photos />
                <Crew />
                <Artists />
                <Links />
                <Footer />
                <Sponsors />
                <Rules />
            </main>
        </>
    );
}
