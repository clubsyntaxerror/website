import type { Event } from "../app/eventData";

export function eventSchema(event: Event) {
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
}
