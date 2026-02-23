import { getEvents } from "./eventData";
import { getVideos } from "./youtubeData";
import Hero from "../components/hero";
import Events from "../components/events";
import About from "../components/about";
import Videos from "../components/videos";
import Photos from "../components/photos";
import Crew from "../components/crew";
import Artists from "../components/artists";
import Links from "../components/links";
import Sponsors from "../components/sponsors";
import Footer from "../components/footer";

export default async function Home() {
    const events = (await getEvents())
        .filter((event) => {
            return event.startDate >= new Date();
        })
        .slice(0, 7);
    const videos = await getVideos();

    const eventSchemas = events.map((event) => {
        const coverFeePrice = parseFloat(event.optionalCoverFee);
        return {
            "@context": "https://schema.org",
            "@type": "MusicEvent",
            name: event.eventName,
            description: event.eventDescription,
            startDate: event.startDate.toISOString(),
            endDate: new Date(event.endDate).toISOString(),
            image: "https://www.syntax-error.se/video-poster.jpg",
            eventStatus: "https://schema.org/EventScheduled",
            performer: { "@type": "PerformingGroup", name: "Club Syntax Error DJs" },
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
                    description: event.optionalCoverFee + " SEK",
                    ...(!isNaN(coverFeePrice) && { price: coverFeePrice }),
                    priceCurrency: "SEK",
                    url: event.optionalCallToActionUrl ?? "https://www.syntax-error.se",
                    availability: "https://schema.org/InStock",
                },
            }),
            ...(event.optionalFacebookEventUrl && { url: event.optionalFacebookEventUrl }),
            ...(event.optionalAgeLimit && { typicalAgeRange: `${event.optionalAgeLimit}+` }),
        };
    });

    return (
        <>
            {eventSchemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
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
            </main>
        </>
    );
}
