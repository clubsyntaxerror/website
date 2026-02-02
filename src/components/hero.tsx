"use client";

import Link from "next/link";
import Textra from "react-textra";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "./utils/hooks";
import type { Event } from "../app/eventData";
import Pong from "./pong";

function NoMotionSocialProofs({ data }: { data: string[] }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((index) => (index + 1) % data.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data]);

    return <span>{data[index]}</span>;
}

export default function Hero({ featuredEvent }: { featuredEvent: Event }) {
    const featuredEventAddress = featuredEvent.optionalVenueStreetAddress
        ? ", " + featuredEvent.optionalVenueStreetAddress
        : featuredEvent.venueName === "H62"
          ? ", Hornsgatan 62, 118 21 Stockholm"
          : "";
    const socialProofs = [
        "Ranked as the #1 activity on Moderskeppet 2024!",
        '"Syntax Error Stockholm is worth your time. It truly is something special. 🙂"',
        '"The atmosphere is awesome and nerdy! Play games, listen to blip blop while drinking beers and socialising."',
        '"Very good place! Amazing crowd and friendly crew and guards in door!"',
        '"Riktigt kul och annorlunda ställe för den som tröttnat på den gamla vanliga "krogsvängen" och gillar att träffa lite annorlunda och färgstarka människor!"',
        '"Party! Party! On! When the chip is pulsing this club is pumping!"',
        '"Tight knit yet open community. Best mixture of different nerd/gamer/underground subcultures or crowds."',
        '"Machokulturen lyser med sin frånvaro, och jag älskar´t!"',
        '"The best club for anyone who likes video games, chiptunes, nerds, board games and friendly people."',
    ];

    const bgRef = useRef<any>(null); // not sure why I need to do this, future todo
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

    useEffect(() => {
        const videoOrImg = bgRef.current;
        const section = sectionRef.current;

        if (videoOrImg && section) {
            const resizeObserver = new ResizeObserver(() => {
                videoOrImg.style.height = `${section.clientHeight}px`;
            });

            resizeObserver.observe(section);
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, [bgRef.current]);

    return (
        <>
            {prefersReducedMotion !== false ? (
                <img
                    src="/video-poster.jpg"
                    className="object-cover w-full h-screen -z-10 zigzag"
                    aria-hidden={true}
                    ref={bgRef}
                />
            ) : (
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover w-full h-screen -z-10 zigzag"
                    poster="/video-poster.jpg"
                    aria-hidden={true}
                    ref={bgRef}
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
            )}
            <section
                className="min-h-screen w-full absolute flex flex-col justify-between items-center"
                ref={sectionRef}
            >
                <aside
                    className="p-4 w-full absolute top-0 left-0 text-center bg-black bg-opacity-90 text-gray-500"
                    aria-hidden={true}
                >
                    {prefersReducedMotion ? (
                        <NoMotionSocialProofs data={socialProofs} />
                    ) : (
                        <Textra effect="simple" data={socialProofs} />
                    )}
                </aside>
                <img
                    src="/images/logo.png"
                    className="logo text-white mt-24 mb-12 md:mt-18"
                    alt="Syntax Error Video Game Party & Nightclub"
                />
                {featuredEvent && (
                    <>
                        <div className="bg-black bg-opacity-90 p-6 w-full flex flex-col justify-around items-center">
                            <div className="md:w-2/3 flex flex-col justify-around items-center text-center">
                                <h2 className="text-white">Next party</h2>
                                <h1 className="rainbow_text_animated">{featuredEvent.eventName}</h1>
                                <p className="text-sm md:text-xl text-left text-gray-500">
                                    {featuredEvent.eventDescription}
                                </p>
                                <div className="text-left text-gray-500 relative pl-6">
                                    <Pong />
                                    <p className="mb-0 text-xs md:text-l pb-1">
                                        <img
                                            src="/icons/date.png"
                                            className="inline align-text-mniddle md:align-text-middle"
                                            width="18"
                                            height="18"
                                            alt="Date"
                                        />{" "}
                                        {featuredEvent.longDate}
                                    </p>
                                    <p className="mb-0 text-xs md:text-l pb-1">
                                        <img
                                            src="/icons/time.png"
                                            className="inline align-text-middle md:align-text-middle"
                                            width="18"
                                            height="18"
                                            alt="Time"
                                        />{" "}
                                        {featuredEvent.openingHours}
                                        {featuredEvent.optionalAgeLimit && ", " + featuredEvent.optionalAgeLimit + "+"}
                                    </p>
                                    <address className="mb-0 text-xs md:text-l not-italic">
                                        <img
                                            src="/icons/location.png"
                                            className="inline align-text-middle md:align-text-middle pb-1"
                                            width="18"
                                            height="18"
                                            alt="Location"
                                        />{" "}
                                        {featuredEvent.venueName}
                                    </address>
                                    <p className="mb-0 text-xs  md:text-l">
                                        <img
                                            src="/icons/ticket.png"
                                            className="inline align-text-middle md:align-text-middle pb-1"
                                            width="18"
                                            height="18"
                                            alt="Tickets"
                                        />{" "}
                                        {featuredEvent.optionalCoverFee
                                            ? featuredEvent.optionalCoverFee + " SEK"
                                            : "free to attend"}
                                    </p>
                                    <p className="mb-0 text-xs  md:text-l mt-4">
                                        {featuredEventAddress && (
                                            <Link
                                                className="underline text-xs md:text-sm align-middle smallbutton uppercase text-pu"
                                                href={"https://maps.google.com/maps?q=" + featuredEventAddress}
                                                target="_blank"
                                            >
                                                Directions
                                            </Link>
                                        )}
                                        {featuredEvent.optionalFacebookEventUrl && (
                                            <Link
                                                className="underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase text-pu"
                                                href={featuredEvent.optionalFacebookEventUrl}
                                                target="_blank"
                                            >
                                                Facebook
                                            </Link>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {featuredEvent.optionalCallToActionTitle && featuredEvent.optionalCallToActionUrl && (
                                <>
                                    <Link
                                        href={featuredEvent.optionalCallToActionUrl}
                                        target="_blank"
                                        className="button cta bg-purple-800 text-white border-2"
                                    >
                                        &gt;&gt; {featuredEvent.optionalCallToActionTitle} &lt;&lt;
                                    </Link>
                                    <Link
                                        className="button more bg-black text-gray-500  border-gray-500 border-2"
                                        data-eo-form-toggle-id="2b5e1218-c793-11ef-a7c8-9d7832b0d31b"
                                        href="#"
                                    >
                                        Newsletter
                                    </Link>
                                </>
                            )}
                            {(!featuredEvent.optionalCallToActionTitle || !featuredEvent.optionalCallToActionUrl) && (
                                <>
                                    <Link
                                        className="button more bg-purple-800 text-white border-2 border-white"
                                        data-eo-form-toggle-id="2b5e1218-c793-11ef-a7c8-9d7832b0d31b"
                                        href="#"
                                    >
                                        <img
                                            src="/icons/mail.png"
                                            className="inline align-text-bottom md:align-text-top"
                                            width="18"
                                            height="18"
                                            aria-hidden="true"
                                        />{" "}
                                        Newsletter
                                    </Link>
                                </>
                            )}
                        </div>
                        <img src="/down.png" className="mb-4" alt="Scroll down for more content" />
                    </>
                )}
            </section>
        </>
    );
}
