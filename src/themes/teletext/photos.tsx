import MosaicArt from "./MosaicArt";
import { Bitmap } from "./mosaic";
import { PHOTOS, type PhotoName } from "./photos.generated";

/** A photo from public/, pre-converted to teletext mosaic by `npm run mosaics`. */
export function Photo({ name }: { name: PhotoName }) {
    const photo = PHOTOS[name];
    const bitmap = new Bitmap(photo.rows);
    for (let i = 0; i < bitmap.pixels.length && i < photo.data.length; i++)
        bitmap.pixels[i] = photo.data.charCodeAt(i) - 48;
    return <MosaicArt bitmap={bitmap} label={photo.alt} className="tt-photo" />;
}
