"use client";

import { useState } from "react";
import Link from "next/link";
import type { Video } from "../app/youtubeData";

export default function Videos({ videos }: { videos: Video[] }) {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    if (videos.length === 0) {
        return null;
    }

    return (
        <section className="p-6 md:py-12 w-full md:w-2/3">
        <h2 className="text-white text-center mb-4">Latest videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => (
                <div key={video.id} className="relative">
                    {expandedId === video.id ? (
                        <div className="aspect-video">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setExpandedId(video.id)}
                            className="w-full text-left group"
                            aria-label={`Play ${video.title}`}
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                    <svg
                                        className="w-16 h-16 text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-400 group-hover:text-white transition-colors line-clamp-2">
                                {video.title}
                            </p>
                        </button>
                    )}
                </div>
            ))}
        </div>
        <div className="w-full text-center mt-4">
            <Link
                href="https://www.youtube.com/channel/UCitAIsd8SDH4omDTLpf5upg"
                target="_blank"
                className="button bg-white text-black"
            >
                Watch more on YouTube
            </Link>
        </div>
        </section>
    );
}
