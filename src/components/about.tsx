import Link from "next/link";
import { DISCORD_URL, intro } from "../content/site";

export default function About() {
    return (
        <>
            <section className="w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag my-12 md:my-24">
                <div className="p-6 md:py-12 md:w-2/3 md:text-xl">
                    <h2 className="text-black text-center mb-4">About us</h2>
                    {intro.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
                <div className="w-full text-center mt-0 mb-6 md:mb-12">
                    <Link href={DISCORD_URL} target="_blank" className="button bg-black text-white">
                        Join our Discord
                    </Link>
                </div>
            </section>
        </>
    );
}
