import Link from "next/link";

export default function Rules() {
    return (
        <section className="p-6 w-full md:w-2/3">
            <details className="rules-panel">
                <summary>
                    <span className="rules-arrow">▶</span>
                    Code of Conduct
                </summary>
                <div className="rules-body">
                    <div className="grid grid-cols-1 2xl:grid-cols-2 gap-x-8">
                        <div className="text-gray-500">
                            <h3>Be respectful</h3>
                            <p>
                                Syntax Error is a place where everyone is welcome, regardless of gender, sexual
                                orientation, ethnicity, religion or favorite Star Trek captain. The only thing that is
                                not welcome is acting disrespectful against other guests, the venue staff or the crew.
                            </p>
                            <p>
                                This includes all forms of unsolicited touching, grabbing, inappropriate gestures or
                                comments or "jokes" at the expense of others.
                            </p>
                            <h3>No harassment of any kind</h3>
                            <p>
                                If someone asks to be left alone, respect that, move along and don't take it personally.
                                Always make sure you have consent before touching or otherwise engaging with other
                                guests. If you're unsure, just ask, and no means no.
                            </p>
                        </div>
                        <div className="text-gray-500">
                            <h3>Reach out to our crew</h3>
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
                                if you need to get in contact with us and don't feel like talking to a person directly.
                                Talking in person is however the preferred way if we need to act on another guest that
                                is behaving inappropriately so that we can intervene immediately.
                            </p>
                            <p>
                                If you can't get behind these simple rules, please refrain from visiting our events. If
                                you purposely do not comply with the rules during an event you WILL be ejected from the
                                venue without question.
                            </p>
                            <p>
                                With that said, we in the Syntax Error crew hope that you will have a most awesome time
                                at our events, and if you're not, please let us know.
                            </p>
                        </div>
                    </div>
                </div>
            </details>
        </section>
    );
}
