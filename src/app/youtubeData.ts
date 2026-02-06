import { google } from "googleapis";
import { cache } from "react";

export const revalidate = 3600;

export type Video = {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
};

const CHANNEL_ID = "UCitAIsd8SDH4omDTLpf5upg";
// YouTube uploads playlist ID is channel ID with "UC" replaced by "UU"
const UPLOADS_PLAYLIST_ID = CHANNEL_ID.replace("UC", "UU");

export const getVideos = cache(async (): Promise<Video[]> => {
    try {
        const apiKey = process.env.YOUTUBE_API_KEY;
        if (!apiKey) {
            console.log("YOUTUBE_API_KEY not configured");
            return [];
        }

        const youtube = google.youtube({ version: "v3", auth: apiKey });

        const response = await youtube.playlistItems.list({
            part: ["snippet"],
            playlistId: UPLOADS_PLAYLIST_ID,
            maxResults: 4,
        });

        const items = response.data.items;
        if (items?.length) {
            return items.map((item) => ({
                id: item.snippet?.resourceId?.videoId || "",
                title: item.snippet?.title || "",
                thumbnail:
                    item.snippet?.thumbnails?.maxres?.url ||
                    item.snippet?.thumbnails?.high?.url ||
                    item.snippet?.thumbnails?.medium?.url ||
                    "",
                publishedAt: item.snippet?.publishedAt || "",
            }));
        }
    } catch (err) {
        console.log("YouTube API error:", err);
    }
    return [];
});
