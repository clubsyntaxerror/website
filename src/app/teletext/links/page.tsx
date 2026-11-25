import type { Metadata } from "next";
import { getVideos } from "../../youtubeData";
import { PAGES } from "../../../themes/teletext/directory";
import { DH, Gap, Leader, TeletextPage, TitleBar } from "../../../themes/teletext/ui";
import { portals } from "../../../content/site";

export const metadata: Metadata = {
    title: "Warp Zone – Club Syntax Error",
    description: "Find Club Syntax Error on Discord, YouTube, Twitch, Instagram and more.",
    alternates: { canonical: "https://www.syntax-error.se/links" },
};

const colors = ["green", "cyan", "yellow", "magenta"] as const;

export default async function LinksPage() {
    const videos = (await getVideos()).slice(0, 6);
    return (
        <TeletextPage number={PAGES.links.number}>
            <TitleBar bg="magenta" color="white">
                WARP ZONE
            </TitleBar>
            <Gap />
            {portals.map((portal, i) => (
                <Leader
                    key={portal.href}
                    href={portal.href}
                    label={portal.text}
                    page=">"
                    color={colors[i % colors.length]}
                    external
                />
            ))}
            {videos.length > 0 && (
                <>
                    <DH as="h2" color="red">
                        LATEST VIDEOS
                    </DH>
                    <Gap />
                    {videos.map((video) => (
                        <Leader
                            key={video.id}
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            label={video.title}
                            page=">"
                            color="white"
                            external
                        />
                    ))}
                </>
            )}
        </TeletextPage>
    );
}
