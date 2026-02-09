import Link from "next/link";

const sponsors = [
    {
        name: "Confetti Events",
        url: "https://confetti.events",
        logo: "/images/sponsors/confetti-events.svg",
    },
];

export default function Sponsors() {
    return (
        <>
            <h2 className="text-white text-center mb-4">Our sponsors</h2>
            <div className="flex flex-wrap justify-center items-center gap-6 p-6">
                {sponsors.map((sponsor) => (
                    <Link
                        key={sponsor.name}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={sponsor.name}
                        className="text-white hover:opacity-70 transition-opacity"
                    >
                        <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            className="h-6 md:h-8 w-auto invert"
                        />
                    </Link>
                ))}
            </div>
        </>
    );
}
