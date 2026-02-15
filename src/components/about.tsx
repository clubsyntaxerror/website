import Link from "next/link";

export default function About() {
    return (
        <>
            <section className="w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag">
                <div className="p-6 md:py-12 md:w-2/3 md:text-xl">
                    <h2 className="text-black text-center mb-4">About us</h2>
                    <p>
                        Welcome to Stockholm's monthly Video Game Party & Nightclub! Dance the night away to video game
                        music and play brand-new or retro video games – all in our uniquely warm and accepting
                        atmosphere.
                    </p>
                    <p>
                        Syntax Error is a party and a nightclub where you'll be in good company if you enjoy playing
                        Street Fighter or Duck Hunt, dancing to video game music, Disney classics and C64 SIDs or simply
                        hiding in the back room playing Magic or any of our other board games all night.
                    </p>
                </div>
            </section>
            <section>
                <div className="w-full text-center mb-4">
                    <Link href="https://discord.gg/URhqp3x" target="_blank" className="button bg-white text-black">
                        Join our Discord
                    </Link>
                </div>
            </section>
        </>
    );
}
