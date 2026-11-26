/**
 * Theme-agnostic copy shared by every theme: change it here and both the classic and the
 * adventure site pick it up.
 */

export const EMAIL = "info@syntax-error.se";
export const DISCORD_URL = "https://discord.gg/URhqp3x";
export const MERCH_URL = "https://shop.syntax-error.se";
export const SPOTIFY_URL = "https://open.spotify.com/playlist/5ESSAvPmAGMN1E7MIlHecA";
export const FACEBOOK_URL = "https://www.facebook.com/SyntaxErrorSthlm/";

export const tagline = "Stockholm's monthly video game nightclub";

export const intro = [
    "Welcome to Stockholm's monthly Video Game Party & Nightclub! Dance the night away to video game music and play brand-new or retro video games - all in our uniquely warm and accepting atmosphere.",
    "Syntax Error is a party and a nightclub where you'll be in good company if you enjoy playing Street Fighter or Duck Hunt, dancing to video game music, Disney classics and C64 SIDs, or simply hiding in the back room playing Magic or any of our other board games all night.",
];

export const about = {
    more: [
        "Between sets there's always something going on: compete in our quiz walk for a chance to win prizes, build precarious towers with our giant Jenga or challenge strangers to a Quake 3 deathmatch on our Raspberry Pi LAN stations.",
        "We take pride in being an inclusive space. Everyone is welcome regardless of gender, sexual orientation, ethnicity, or religion. Our dedicated crew enforces a strict Code of Conduct to make sure every guest feels safe and respected.",
    ],
    organization: [
        "Club Syntax Error is run by Svenska Spelmusikfrämjandet (the Swedish Association for the Promotion of Video Game Music), a non-profit organization founded in 2002. The association is entirely volunteer-run - everyone from the DJs to the crew members gives their time freely because they love the community.",
        "Over more than two decades the organization has grown from a small LAN-party crowd into a beloved monthly institution in Stockholm's nightlife. Surplus from ticket sales goes back into improving the event - better games, better equipment, better experiences for you.",
    ],
    history: [
        {
            version: "Version 1.0 - 2002",
            text: 'Syntax Error started in 2002 when Jon Edlund and Christian Rehne wanted people to listen to Instant Remedy when going out in Stockholm. They kicked things off at Soderkallaren using Winamp and a laptop, together with a handful of enthusiastic nerds. The name was taken from Thomas "Sol" Sunhedens fantastic radio show.',
        },
        {
            version: "Version 2.0 - 2005",
            text: "Between 2005 and 2008 the venue of choice was Grottan and the crew grew with new members. After nearly a year of hiatus the club returned to Grottan with over 300 nerds, organized live performances, LED throwie workshops, and secured three new DJs: Andreas Ahlborg, David Edstrom and Nik Reiman.",
        },
        {
            version: "Version 3.0 - 2009",
            text: "In fall 2009 the club secured a Saturday each month at H62 on Mariatorget - the venue that is still home today. The organization turned legit, registered as a non-profit, and kept growing: more video games, lasers, epic performers like Dubmood and FantomenK, and the beloved annual Halloween costume party. Collaborations followed with SEC-T, Gamer's Night, Kodachicon and KarateGamers, and the club even rented the ballroom-like Bryggarsalen for a Halloween special. A lot of new members joined the crew as well.",
        },
        {
            version: "Version 4.0 - 2020",
            text: "In 2020 the COVID-19 pandemic forced the club to shut down for the first time in its history. The crew used the time to build a new website, start a Twitch channel, build a VR chat copy of the nightclub and host online events to keep the community together.",
        },
        {
            version: "Version 5.0 - 2025",
            text: "In 2025 we sent our our first ever annual survey to get feedback from our guests and learn how to make the club even better. The response was overwhelming and we got tons of great suggestions that we promptly started implementing.",
        },
    ],
};

export const rules = {
    lead: "Syntax Error is a place where everyone is welcome",
    sections: [
        {
            heading: "Be respectful",
            paragraphs: [
                "Syntax Error is a place where everyone is welcome, regardless of gender, sexual orientation, ethnicity, religion or favorite Star Trek captain. The only thing that is not welcome is acting disrespectful against other guests, the venue staff or the crew.",
                "This includes all forms of unsolicited touching, grabbing, inappropriate gestures or comments or “jokes” at the expense of others.",
            ],
        },
        {
            heading: "No harassment of any kind",
            paragraphs: [
                "If someone asks to be left alone, respect that, move along and don't take it personally. Always make sure you have consent before touching or otherwise engaging with other guests. If you're unsure, just ask, and no means no.",
            ],
        },
        {
            heading: "Reach out to our crew",
            paragraphs: [
                "If someone is making you feel uneasy, if you need to talk to someone confidentially or if you just want to chat, grab the closest person wearing a red Syntax Error crew t-shirt. We in the crew are dedicated to making sure everyone has a good time during our events.",
                `You can also email us at ${EMAIL} if you need to get in contact with us and don't feel like talking to a person directly. Talking in person is however the preferred way if we need to act on another guest that is behaving inappropriately so that we can intervene immediately.`,
                "If you can't get behind these simple rules, please refrain from visiting our events. If you purposely do not comply with the rules during an event you WILL be ejected from the venue without question.",
                "With that said, we in the Syntax Error crew hope that you will have a most awesome time at our events, and if you're not, please let us know.",
            ],
        },
    ],
};

/** Guest quotes. `sv` marks the Swedish ones, which the English-only themes skip. */
export const socialProofQuotes: { text: string; sv?: true }[] = [
    { text: "Ranked as the #1 activity on Moderskeppet 2024!" },
    { text: '"Syntax Error Stockholm is worth your time. It truly is something special. 🙂"' },
    {
        text: '"The atmosphere is awesome and nerdy! Play games, listen to blip blop while drinking beers and socialising."',
    },
    { text: '"Very good place! Amazing crowd and friendly crew and guards in door!"' },
    {
        text: '"Riktigt kul och annorlunda ställe för den som tröttnat på den gamla vanliga "krogsvängen" och gillar att träffa lite annorlunda och färgstarka människor!"',
        sv: true,
    },
    { text: '"Party! Party! On! When the chip is pulsing this club is pumping!"' },
    {
        text: '"Tight knit yet open community. Best mixture of different nerd/gamer/underground subcultures or crowds."',
    },
    { text: '"Machokulturen lyser med sin frånvaro, och jag älskar´t!"', sv: true },
    {
        text: '"The best club for anyone who likes video games, chiptunes, nerds, board games and friendly people."',
    },
];

export const socialProofs = socialProofQuotes.map((quote) => quote.text);

export const portals = [
    { href: DISCORD_URL, label: "Discord", icon: "/social/discord.svg", text: "Join our Discord server" },
    { href: MERCH_URL, label: "Merch", icon: "/social/spreadshirt.svg", text: "Buy our merchandise" },
    {
        href: "https://g.page/r/CVTC7Oz0rQTWEBM",
        label: "Google",
        icon: "/social/google.svg",
        text: "Review us on Google",
    },
    {
        href: "https://www.facebook.com/clubsyntaxerror/",
        label: "Facebook",
        icon: "/social/facebook.svg",
        text: "Follow us on Facebook",
    },
    {
        href: "https://tiktok.com/@clubsyntaxerror",
        label: "TikTok",
        icon: "/social/tiktok.svg",
        text: "Follow us on TikTok",
    },
    {
        href: "https://www.instagram.com/clubsyntaxerror/",
        label: "Instagram",
        icon: "/social/instagram.svg",
        text: "Follow us on Instagram",
    },
    {
        href: "https://www.twitch.tv/clubsyntaxerror/videos/",
        label: "Twitch",
        icon: "/social/twitch.svg",
        text: "Watch us on Twitch",
    },
    {
        href: "https://www.youtube.com/channel/UCitAIsd8SDH4omDTLpf5upg",
        label: "YouTube",
        icon: "/social/youtube.svg",
        text: "Watch us on YouTube",
    },
    {
        href: "https://bsky.app/profile/clubsyntaxerror.bsky.social",
        label: "Bluesky",
        icon: "/social/bluesky.svg",
        text: "Follow us on Bluesky",
    },
    { href: "https://x.com/clubsyntaxerror", label: "X", icon: "/social/x.svg", text: "Follow us on X" },
    {
        href: "https://github.com/clubsyntaxerror",
        label: "GitHub",
        icon: "/social/github.svg",
        text: "Code with us on GitHub",
    },
];

export const crew = [
    {
        name: "Crew",
        members: "Ventura, Fastbom, Weyland, Ookamineko, MissStabby, Jor-el, Njursten, Toolsmonkey, Fetish23, Klein64",
    },
    { name: "DJs", members: "Ventura, Fastbom, Weyland, Ookamineko, MissStabby, Jor-el, Klein64" },
    { name: "VJs", members: "Weyland, Fastbom, MissStabby, Fetish23" },
    { name: "Board", members: "Ventura (chairman), Weyland (treasurer), MissStabby, Jor-el, Ookamineko" },
    {
        name: "Alumni",
        members:
            "Jon, Matti, Lindroth, Wezz, Daniel, Nik, Whiting, Borchers, McFly, Windefalk, MrTimpi, Hakushi, Velo, Zaz, A3M1N",
    },
];

export const artists = [
    "047",
    "Algar",
    "anti Lag",
    "Bitvortex",
    "Blastromen",
    "Bossfight",
    "Boy vs Bacteria",
    "Brandon Walsh",
    "Chipzel",
    "Cyanide Dansen",
    "Dual Core",
    "Dubmood",
    "Dunderpatrullen",
    "DJ Diskmachine",
    "FantomenK",
    "Fastbom",
    "FsFreak",
    "Goto80",
    "Hello World",
    "Instant Remedy",
    "Irving Force",
    "Jeroen Tel",
    "laamaa",
    "Lizard King",
    "Magnavolt",
    "Maktone",
    "Maskinpop",
    "Master Boot Record",
    "MegaNeko",
    "Moogen",
    "Ninjaspark",
    "Nordloef",
    "Panther Cat Animal",
    "Powerplay",
    "RoccoW",
    "Rymdkraft",
    "SabrePulse",
    "Savlonic",
    "Shirobon",
    "Starchild",
    "Tekmann",
    "Thermostatic",
    "Ultrasyd",
    "USK",
    "Wiklund",
    "Zabutom",
    "Zalza",
];

export const sponsors = [
    { name: "Confetti Events", url: "https://confetti.events", logo: "/images/sponsors/confetti-events.svg" },
];
