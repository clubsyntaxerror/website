export default function Artists() {
    return (
        <section className="p-6 w-full md:w-2/3">
            <h2 className="text-white text-center mb-4">Our sound</h2>
            <img src="/photos/artists.jpg" className="mb-4" alt="Artist playing at Syntax Error" />
            <p className="text-gray-500">
                This is a list of awesome artists that has played at our clubs or concerts in the past.
            </p>
            <p className="rainbow_text_animated">
                047, Algar, Bitvortex, Blastromen, Bossfight, Boy vs Bacteria, Brandon Walsh, Chipzel, Cyanide Dansen,
                Dual Core, Dubmood, Dunderpatrullen, DJ Diskmachine, FantomenK, Fastbom, FsFreak, Goto80, Hello World,
                Instant Remedy, Irving Force, Jeroen Tel, laamaa, Lizard King, Magnavolt, Maktone, Maskinpop, MegaNeko,
                Moogen, Ninjaspark, Nordloef, Panther Cat Animal, Powerplay, RoccoW, Rymdkraft, SabrePulse, Savlonic,
                Shirobon, Starchild, Tekmann, Thermostatic, Ultrasyd, USK, Wiklund, Zabutom, Zalza
            </p>
            <iframe
                style={{ borderRadius: "12px", border: "none" }}
                src="https://open.spotify.com/embed/playlist/5ESSAvPmAGMN1E7MIlHecA?utm_source=generator&theme=0"
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="mt-4"
            />
        </section>
    );
}
