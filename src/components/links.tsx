import Link from "next/link";

const portals = [
    { href: "https://discord.gg/URhqp3x", icon: "/social/discord.svg", label: "Join our Discord server" },
    { href: "https://shop.syntax-error.se", icon: "/social/spreadshirt.svg", label: "Buy our merchandise" },
    { href: "https://g.page/r/CVTC7Oz0rQTWEBM", icon: "/social/google.svg", label: "Review us on Google" },
    { href: "https://www.facebook.com/clubsyntaxerror/", icon: "/social/facebook.svg", label: "Follow us on Facebook" },
    { href: "https://tiktok.com/@clubsyntaxerror", icon: "/social/tiktok.svg", label: "Follow us on TikTok" },
    {
        href: "https://www.instagram.com/clubsyntaxerror/",
        icon: "/social/instagram.svg",
        label: "Follow us on Instagram",
    },
    { href: "https://www.twitch.tv/clubsyntaxerror/videos/", icon: "/social/twitch.svg", label: "Watch us on Twitch" },
    {
        href: "https://www.youtube.com/channel/UCitAIsd8SDH4omDTLpf5upg",
        icon: "/social/youtube.svg",
        label: "Watch us on YouTube",
    },
    {
        href: "https://bsky.app/profile/clubsyntaxerror.bsky.social",
        icon: "/social/bluesky.svg",
        label: "Follow us on Bluesky",
    },
    { href: "https://x.com/clubsyntaxerror", icon: "/social/x.svg", label: "Follow us on X" },
    { href: "https://github.com/clubsyntaxerror", icon: "/social/github.svg", label: "Code with us on GitHub" },
];

export default function Links() {
    return (
        <section className="p-6 w-full md:w-2/3">
            <div className="arcade-screen">
                <div className="arcade-scanlines" aria-hidden="true" />
                <h2 className="arcade-header">
                    <span className="blink">&#x2B25;</span> WARP ZONE <span className="blink">&#x2B25;</span>
                </h2>
                <nav className="arcade-menu">
                    {portals.map((portal) => (
                        <Link
                            key={portal.href}
                            href={portal.href}
                            target="_blank"
                            title={portal.label}
                            className="arcade-item"
                        >
                            <img src={portal.icon} aria-hidden="true" alt="" />
                            <span>{portal.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </section>
    );
}
