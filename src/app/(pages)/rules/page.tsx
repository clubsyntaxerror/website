import { Metadata } from "next";
import Link from "next/link";
import Footer from "../../../components/footer";

export const metadata: Metadata = {
    title: "Rules – Club Syntax Error",
    description:
        "Club Syntax Error's Code of Conduct. Everyone is welcome at our events – read our guidelines for a safe and respectful experience for all guests.",
    alternates: {
        canonical: "https://www.syntax-error.se/rules",
    },
    openGraph: {
        siteName: "Club Syntax Error",
        title: "Rules – Club Syntax Error",
        description:
            "Club Syntax Error's Code of Conduct. Everyone is welcome at our events – read our guidelines for a safe and respectful experience for all guests.",
        url: "https://www.syntax-error.se/rules",
        images: [
            {
                url: "https://www.syntax-error.se/video-poster.jpg",
                width: 1920,
                height: 1080,
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function CodeOfConductPage() {
    return (
        <main className="flex min-h-screen flex-col items-center pt-16">
            <section className="w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag">
                <div className="p-6 md:py-12 md:w-2/3">
                    <h1 className="text-black text-center mb-2">Rules</h1>
                    <p className="text-center text-sm opacity-70 mb-0">
                        Syntax Error is a place where everyone is welcome
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>Be respectful</h3>
                <div className="text-gray-500">
                    <p>
                        Syntax Error is a place where everyone is welcome, regardless of gender, sexual
                        orientation, ethnicity, religion or favorite Star Trek captain. The only thing that is
                        not welcome is acting disrespectful against other guests, the venue staff or the crew.
                    </p>
                    <p>
                        This includes all forms of unsolicited touching, grabbing, inappropriate gestures or
                        comments or &ldquo;jokes&rdquo; at the expense of others.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>No harassment of any kind</h3>
                <div className="text-gray-500">
                    <p>
                        If someone asks to be left alone, respect that, move along and don&apos;t take it personally.
                        Always make sure you have consent before touching or otherwise engaging with other
                        guests. If you&apos;re unsure, just ask, and no means no.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>Reach out to our crew</h3>
                <div className="text-gray-500">
                    <p>
                        If someone is making you feel uneasy, if you need to talk to someone confidentially or
                        if you just want to chat, grab the closest person wearing a red Syntax Error crew
                        t-shirt. We in the crew are dedicated to making sure everyone has a good time during our
                        events.
                    </p>
                    <p>
                        You can also email us at{" "}
                        <Link href="mailto:info@syntax-error.se" className="smallbutton">
                            info@syntax-error.se
                        </Link>{" "}
                        if you need to get in contact with us and don&apos;t feel like talking to a person directly.
                        Talking in person is however the preferred way if we need to act on another guest that
                        is behaving inappropriately so that we can intervene immediately.
                    </p>
                    <p>
                        If you can&apos;t get behind these simple rules, please refrain from visiting our events. If
                        you purposely do not comply with the rules during an event you WILL be ejected from the
                        venue without question.
                    </p>
                    <p>
                        With that said, we in the Syntax Error crew hope that you will have a most awesome time
                        at our events, and if you&apos;re not, please let us know.
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
