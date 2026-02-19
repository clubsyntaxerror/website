import { Metadata } from "next";
import Footer from "../../components/footer";

export const metadata: Metadata = {
    title: "FAQ – Club Syntax Error",
    description:
        "Answers to common questions about Club Syntax Error – Stockholm's monthly video game nightclub. Entry price, venue, music, games, accessibility and more.",
    alternates: {
        canonical: "https://www.syntax-error.se/faq",
    },
    openGraph: {
        siteName: "Club Syntax Error",
        title: "FAQ – Club Syntax Error",
        description:
            "Answers to common questions about Club Syntax Error – Stockholm's monthly video game nightclub.",
        url: "https://www.syntax-error.se/faq",
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

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Club Syntax Error is Stockholm's monthly video game party and nightclub. You can dance to video game music and chiptunes, play brand-new and retro video games, enjoy board games, and socialize in a warm and accepting atmosphere. It is run by the non-profit organization Svenska Spelmusikfrämjandet.",
            },
        },
        {
            "@type": "Question",
            name: "How often does Club Syntax Error take place?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Club Syntax Error is held monthly in Stockholm. Check the party calendar on syntax-error.se for exact dates.",
            },
        },
        {
            "@type": "Question",
            name: "Where is Club Syntax Error held?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Club Syntax Error most commonly takes place at H62, Hornsgatan 62, Stockholm. Some special events may be held at other venues - always check the event listing for the specific location.",
            },
        },
        {
            "@type": "Question",
            name: "How much does it cost to attend Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Entry to Club Syntax Error typically costs between 120–180 SEK. Some special events may have different pricing. Tickets can be purchased through the website and at the door.",
            },
        },
        {
            "@type": "Question",
            name: "What kind of music is played at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The DJs and VJs at Club Syntax Error play video game music, chiptunes, C64 SIDs and other gaming-related genres. The lineup varies by event and featured artists.",
            },
        },
        {
            "@type": "Question",
            name: "Is Club Syntax Error LGBTQ+ friendly?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Club Syntax Error is an inclusive event where everyone is welcome regardless of gender, sexual orientation, or ethnicity. The club has a strict Code of Conduct and dedicated crew members to ensure a safe and respectful environment for all guests.",
            },
        },
        {
            "@type": "Question",
            name: "What is the age limit at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Club Syntax Error events are generally 18+. The age limit is confirmed on each individual event listing.",
            },
        },
        {
            "@type": "Question",
            name: "Can I play video games at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! Alongside the dancefloor and music, Club Syntax Error features both brand-new and retro video games to play, as well as a selection of board games.",
            },
        },
        {
            "@type": "Question",
            name: "Do I need to buy tickets in advance for Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Tickets are available both in advance and at the door. Buying in advance lets you choose between a lower and a higher price tier - the higher tier is a way to give a little extra to the non-profit organization behind the club. Walk-up tickets are available on the night while capacity allows.",
            },
        },
        {
            "@type": "Question",
            name: "Is there a cloakroom at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, and it is included in the ticket price at a value of 30 SEK as a nice perk.",
            },
        },
        {
            "@type": "Question",
            name: "How do I get to Club Syntax Error by public transport?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The closest metro station is Mariatorget on the red line. From there it is a short walk to H62 at Hornsgatan 62, which is the regular venue.",
            },
        },
        {
            "@type": "Question",
            name: "What games can I play at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The game selection varies throughout the year but typically includes retro consoles such as NES, SNES, Mega Drive, and PlayStation 1, as well as a Steam gaming PC with four gamepads, two Stepmania dance mat stations with support bars, a small Quake 3 LAN running on Raspberry Pis, and a large selection of board games including Cards Against Humanity with many expansion packs.",
            },
        },
        {
            "@type": "Question",
            name: "Is there a dress code at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "There is no dress code. Come as you are - nerd-friendly attire is perfectly at home. Festive and cosplay outfits are always present and actively encouraged.",
            },
        },
        {
            "@type": "Question",
            name: "Is Club Syntax Error wheelchair accessible?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The venue at H62 is unfortunately not fully wheelchair accessible due to old staircases. That said, the club does have recurring guests who use wheelchairs with the assistance of portable stair-climbing equipment. If you have specific accessibility needs, reach out to the crew in advance at info@syntax-error.se.",
            },
        },
        {
            "@type": "Question",
            name: "Can I volunteer or perform at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes to both! Anyone interested in volunteering can ask in the Syntax Error Discord server. Volunteer tasks include setting up video games and decorations and helping tear them down after the event. Active volunteers can be elected as organization members after a year or two, which opens the door to becoming a DJ. Live acts and artists who produce chiptunes or video game music are always welcome - reach out via Discord or email info@syntax-error.se.",
            },
        },
        {
            "@type": "Question",
            name: "Is there food and drinks at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, drinks are served at the bar. The first two hours of every event feature a happy hour with 25% off all drinks. Food availability may vary by venue.",
            },
        },
        {
            "@type": "Question",
            name: "Is there free WiFi at the venue?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, H62 provides free high-speed WiFi for guests.",
            },
        },
        {
            "@type": "Question",
            name: "What if I lose something at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "If you lose something at H62, contact the venue directly at h62.se and they will help you. If an event was held at a different venue, contact that venue directly for the best service.",
            },
        },
        {
            "@type": "Question",
            name: "Is there a guestlist at Club Syntax Error?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "The guestlist is reserved for close friends, family, and people who help out with our events. There is no general public guestlist.",
            },
        },
        {
            "@type": "Question",
            name: "Can I book Club Syntax Error for a private event?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! Club Syntax Error is available for hire as long as it aligns with our values and brand. We can provide DJs, VJs, artists, activities and planning for successful events. Send us details of your event and what you want help with via email at info@syntax-error.se.",
            },
        },
    ],
};

const faqs: { question: string; answer: string }[] = faqSchema.mainEntity.map((item) => ({
    question: item.name,
    answer: item.acceptedAnswer.text,
}));

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
