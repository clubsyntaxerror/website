import { SPOTIFY_URL, artists } from "../content/site";

export default function Artists() {
    return (
        <>
            <section className="p-6 w-full md:w-2/3">
                <h2 className="text-white text-center mb-4">Our artists</h2>
                <img src="/photos/artists.jpg" className="mb-4" alt="Artist playing at Syntax Error" />
                <p className="text-gray-500">
                    This is a list of awesome artists that has played at our clubs or concerts in the past.
                </p>
                <p className="rainbow_text_animated">{artists.join(", ")}</p>
            </section>
            <section className="p-6 w-full md:w-2/3">
                <h2 className="text-white text-center mb-4">Sounds of Syntax Error</h2>
                <iframe
                    style={{ borderRadius: "12px", border: "none" }}
                    src={`${SPOTIFY_URL.replace("/playlist/", "/embed/playlist/")}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                />
            </section>
        </>
    );
}
