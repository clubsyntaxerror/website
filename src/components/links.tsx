import Link from "next/link";
import { portals } from "../content/site";

export default function Links() {
    return (
        <section className="p-6 w-full md:w-2/3">
            <div className="arcade-screen">
                <div className="arcade-scanlines" aria-hidden="true" />
                <h2 className="arcade-header">
                    <span className="blink">&#x2B25;</span> WARP ZONE <span className="blink">&#x2B25;</span>
                </h2>
                <nav className="arcade-menu">
                    {portals.map((portal) => (
                        <Link
                            key={portal.href}
                            href={portal.href}
                            target="_blank"
                            title={portal.text}
                            className="arcade-item"
                        >
                            <img src={portal.icon} aria-hidden="true" alt="" />
                            <span>{portal.text}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </section>
    );
}
