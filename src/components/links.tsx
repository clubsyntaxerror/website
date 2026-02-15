import Link from "next/link";

export default function Links() {
    return (
        <section className="p-6 w-full md:w-2/3">
            <h2 className="text-white text-center mb-4">Our community</h2>
            <section className="links whitespace-nowrap">
                <Link
                    href="https://discord.gg/URhqp3x"
                    target="_blank"
                    className="smallbutton"
                    title="Join our Discord server"
                >
                    <img src="/social/spreadshirt.svg" aria-hidden="true"></img> Join our Discord server
                </Link>
                <Link
                    href="https://shop.syntax-error.se"
                    target="_blank"
                    className="smallbutton"
                    title="Buy our merchandise"
                >
                    <img src="/social/spreadshirt.svg" aria-hidden="true"></img> Buy our merchandize
                </Link>
                <Link
                    href="https://www.facebook.com/clubsyntaxerror/"
                    target="_blank"
                    className="smallbutton"
                    title="Follow us on Facebook"
                >
                    <img src="/social/facebook.svg" aria-hidden="true"></img> Follow us on Facebook
                </Link>
                <Link
                    href="https://tiktok.com/@clubsyntaxerror"
                    target="_blank"
                    className="smallbutton"
                    title="Follow us on TikTok"
                >
                    <img src="/social/tiktok.svg" aria-hidden="true"></img> Follow us on TikTok
                </Link>
                <Link
                    href="https://www.instagram.com/syntaxerrorsthlm/"
                    target="_blank"
                    className="smallbutton"
                    title="Follow us on Instagram"
                >
                    <img src="/social/instagram.svg" aria-hidden="true"></img> Follow us on Instagram
                </Link>
                <Link
                    href="https://www.twitch.tv/clubsyntaxerror/videos/"
                    target="_blank"
                    className="smallbutton"
                    title="Watch us on Twitch"
                >
                    <img src="/social/twitch.svg" aria-hidden="true"></img> Watch us on Twitch
                </Link>
                <Link
                    href="https://www.youtube.com/channel/UCitAIsd8SDH4omDTLpf5upg"
                    target="_blank"
                    className="smallbutton"
                    title="Watch us on YouTube"
                >
                    <img src="/social/youtube.svg" aria-hidden="true"></img> Watch us on YouTube
                </Link>
                <Link
                    href="https://bsky.app/profile/clubsyntaxerror.bsky.social"
                    target="_blank"
                    className="smallbutton"
                    title="Follow us on Bluesky"
                >
                    <img src="/social/bluesky.svg" aria-hidden="true"></img> Follow us on Bluesky
                </Link>
                <Link
                    href="https://x.com/clubsyntaxerror"
                    target="_blank"
                    className="smallbutton"
                    title="Follow us on X"
                >
                    <img src="/social/x.svg" aria-hidden="true"></img> Follow us on X
                </Link>
                <Link
                    href="https://github.com/clubsyntaxerror"
                    target="_blank"
                    className="smallbutton"
                    title="Code with us on GitHub"
                >
                    <img src="/social/github.svg" aria-hidden="true"></img> Code with us on GitHub
                </Link>
                <Link
                    href="https://g.page/r/CVTC7Oz0rQTWEBM"
                    target="_blank"
                    className="smallbutton"
                    title="Review us on Google"
                >
                    <img src="/social/google.svg" aria-hidden="true"></img> Review us on Google
                </Link>
            </section>
        </section>
    );
}
