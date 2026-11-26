import type { Metadata } from "next";
import { getVideos } from "../../youtubeData";
import { Heading, Room } from "../../../themes/adventure/ui";
import type { ColorName } from "../../../themes/adventure/palette";
import { portals } from "../../../content/site";

export const metadata: Metadata = {
    title: "Warp Zone – Club Syntax Error",
    description: "Find Club Syntax Error on Discord, YouTube, Twitch, Instagram and more.",
    alternates: { canonical: "https://www.syntax-error.se/links" },
};

const colors: ColorName[] = ["lightGreen", "cyan", "yellow", "lightRed"];

export default async function WarpZone() {
    const videos = (await getVideos()).slice(0, 6);
    return (
        <Room id="warp">
            <ul className="adv-portals">
                {portals.map((portal, i) => (
                    <li key={portal.href}>
                        <a
                            href={portal.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`fg-${colors[i % colors.length]}`}
                        >
                            ^ {portal.text}
                        </a>
                    </li>
                ))}
            </ul>
            {videos.length > 0 && (
                <section>
                    <Heading color="lightRed">VISIONS IN THE CRYSTAL</Heading>
                    <ul className="adv-portals">
                        {videos.map((video) => (
                            <li key={video.id}>
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    &gt; {video.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </Room>
    );
}
