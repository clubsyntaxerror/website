import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Links() {
    const t = useTranslations("Links");

    return (
        <>
            <h2 className="text-white text-center mb-4">{t("ourCommunity")}</h2>
            <section className="links whitespace-nowrap">
                <Link href="https://discord.gg/URhqp3x" target="_blank" className="smallbutton">
                    <img src="/social/spreadshirt.svg" aria-hidden="true"></img> {t("joinOurDiscord")}
                </Link>
                <Link href="https://shop.syntax-error.se" target="_blank" className="smallbutton">
                    <img src="/social/spreadshirt.svg" aria-hidden="true"></img> {t("buyOurMerchandise")}
                </Link>
                <Link href="https://www.facebook.com/clubsyntaxerror/" target="_blank" className="smallbutton">
                    <img src="/social/facebook.svg" aria-hidden="true"></img> {t("followUsOnFacebook")}
                </Link>
                <Link href="https://tiktok.com/@clubsyntaxerror" target="_blank" className="smallbutton">
                    <img src="/social/tiktok.svg" aria-hidden="true"></img> {t("followUsOnTikTok")}
                </Link>
                <Link href="https://www.instagram.com/clubsyntaxerror/" target="_blank" className="smallbutton">
                    <img src="/social/instagram.svg" aria-hidden="true"></img> {t("followUsOnInstagram")}
                </Link>
                <Link href="https://www.twitch.tv/clubsyntaxerror/videos/" target="_blank" className="smallbutton">
                    <img src="/social/twitch.svg" aria-hidden="true"></img> {t("watchUsOnTwitch")}
                </Link>
                <Link
                    href="https://www.youtube.com/channel/UCitAIsd8SDH4omDTLpf5upg"
                    target="_blank"
                    className="smallbutton"
                >
                    <img src="/social/youtube.svg" aria-hidden="true"></img> {t("watchUsOnYouTube")}
                </Link>
                <Link href="https://www.twitter.com/clubsyntaxerror/" target="_blank" className="smallbutton">
                    <img src="/social/twitter.svg" aria-hidden="true"></img> {t("followUsOnXwitter")}
                </Link>
                <Link href="https://github.com/clubsyntaxerror" target="_blank" className="smallbutton">
                    <img src="/social/github.svg" aria-hidden="true"></img> {t("codeWithUsOnGitHub")}
                </Link>
                <Link href="https://g.page/r/CVTC7Oz0rQTWEBM" target="_blank" className="smallbutton">
                    <img src="/social/google.svg" aria-hidden="true"></img> {t("reviewUsOnGoogle")}
                </Link>
            </section>
        </>
    );
}
