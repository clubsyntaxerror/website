import { PHOTOS, type PhotoName } from "./photos.generated";

/** A photo converted to C64 colours by `npm run photos`. */
export default function Photo({ name }: { name: PhotoName }) {
    const photo = PHOTOS[name];
    return (
        // A tiny pre-dithered PNG: next/image resampling would smear the pixels.
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            className="adv-photo"
            style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            loading="lazy"
        />
    );
}
