"use client";

import { useState } from "react";
import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useTranslations } from "next-intl";

export default function Photos() {
    const [index, setIndex] = useState(-1);
    const t = useTranslations("Photos");

    const photos = [
        {
            src: "/photos/social-1.jpg",
            width: 1920,
            height: 1080,
            alt: t("alt1"),
        },
        { src: "/photos/social-2.jpg", width: 1920, height: 1080, alt: t("alt2") },
        { src: "/photos/social-3.jpg", width: 1920, height: 1080, alt: t("alt3") },
        { src: "/photos/social-4.jpg", width: 1920, height: 1080, alt: t("alt4") },
        { src: "/photos/social-5.jpg", width: 1920, height: 1080, alt: t("alt5") },
        {
            src: "/photos/social-6.jpg",
            width: 1920,
            height: 1080,
            alt: t("alt6"),
        },
        {
            src: "/photos/social-7.jpg",
            width: 1920,
            height: 1080,
            alt: t("alt7"),
        },
        {
            src: "/photos/social-8.jpg",
            width: 1920,
            height: 1080,
            alt: t("alt8"),
        },
        {
            src: "/photos/social-9.jpg",
            width: 1920,
            height: 1080,
            alt: t("alt9"),
        },
        {
            src: "/photos/social-10.jpg",
            width: 1920,
            height: 1080,
            alt: t("alt10"),
        },
    ];

    const openInLightbox = t("openInLightbox");
    return (
        <>
            <PhotoAlbum
                layout="rows"
                photos={photos.map((photo) => ({ ...photo, alt: `${photo.alt} ${openInLightbox}` }))}
                onClick={({ index }) => setIndex(index)}
            />

            <Lightbox
                slides={photos as any} // Lightbox doesn't strictly support the type due to alt, but its fine.
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </>
    );
}
