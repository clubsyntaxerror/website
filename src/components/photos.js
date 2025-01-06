"use client"
import { useState } from "react"
import PhotoAlbum from "react-photo-album"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Slideshow from "yet-another-react-lightbox/plugins/slideshow"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import "yet-another-react-lightbox/plugins/thumbnails.css"

const photos = [
  { src: "/photos/social-1.jpg", width: 1920, height: 1080, alt: "2 people dressed up as Luigi and Mario doing a cheers with a drink" },
  { src: "/photos/social-2.jpg", width: 1920, height: 1080, alt: "2 people playing on a NES" },
  { src: "/photos/social-3.jpg", width: 1920, height: 1080, alt: "5 people playing on a TV with a mouse attached" },
  { src: "/photos/social-4.jpg", width: 1920, height: 1080, alt: "A DJ playing with people in front" },
  { src: "/photos/social-5.jpg", width: 1920, height: 1080, alt: "People dressing up with Batman in the middle" },
  { src: "/photos/social-6.jpg", width: 1920, height: 1080, alt: "A Darth Vader helmet with lights reflecting off the helmet" },
  { src: "/photos/social-7.jpg", width: 1920, height: 1080, alt: "A crowded bar area prominantly showing 2 people playing on a TV" },
  { src: "/photos/social-8.jpg", width: 1920, height: 1080, alt: "Close up of 2 people on the dance floor, left has their mouth open, right is smiling" },
  { src: "/photos/social-9.jpg", width: 1920, height: 1080, alt: "2 people dressed up almost touching their faces together" },
  { src: "/photos/social-10.jpg", width: 1920, height: 1080, alt: "A person with blue hair and animal ears in the same colour" },
]

function altCtx(photos) {
    return photos.map(photo => ({
        ...photo,
        alt: `${photo.alt} click to open in lightbox`,
    }));
}

export default function Photos() {
    const [index, setIndex] = useState(-1)

    return (
        <>
            <PhotoAlbum layout="rows" photos={altCtx(photos)} onClick={({ index }) => setIndex(index)} />
            
            <Lightbox
                slides={photos}
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
            />
        </>
   )
}