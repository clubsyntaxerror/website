"use client";

import Link from "next/link";
import Textra from "react-textra";
import { useRef, useEffect, useState } from "react";
import { useMediaQuery } from "./utils/hooks";
import { useTranslations } from "next-intl";
import { formatLongDate, formatOpeningHours } from "./utils/timeFormatting";
import type { Event } from "../getEvents";

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

export default function Hero({ featuredEvent, locale }: { featuredEvent: Event; locale: string }) {
    const t = useTranslations("Hero");

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
                <img src="/images/logo.png" className="logo text-white mt-24 mb-4 md:mt-18" alt={t("logoAlt")} />
                <Link
                    href={locale === "sv" ? "/en" : "/sv"}
                    className="text-center bg-black bg-opacity-90 p-4 mb-4 text-sm rounded-full"
                >
                    {locale === "sv" ? "View in English" : "Visa i Svenska"}
                </Link>
                {featuredEvent && (
                    <>
                        <div className="bg-black bg-opacity-90 p-6 w-full flex flex-col justify-around items-center">
                            <div className="md:w-2/3 flex flex-col justify-around items-center text-center">
                                <h2 className="text-white">{t("nextParty")}</h2>
                                <h1 className="rainbow_text_animated">
                                    {locale === "sv" ? featuredEvent.eventNameSve : featuredEvent.eventNameEng}
                                </h1>
                                <p className="text-sm md:text-xl text-left text-gray-500">
                                    {locale === "sv"
                                        ? featuredEvent.eventDescriptionSve
                                        : featuredEvent.eventDescriptionEng}
                                </p>
                                <div className="text-left text-gray-500 relative">
                                    <div className="ping hero"></div>
                                    <div className="ball -ml-12"></div>
                                    <p className="mb-0 text-xs md:text-l pb-1">
                                        <img
                                            src="/icons/date.png"
                                            className="inline align-text-mniddle md:align-text-middle"
                                            width="18"
                                            height="18"
                                            alt={t("date")}
                                        />{" "}
                                        {formatLongDate(featuredEvent.eventStart)}
                                        {featuredEvent.facebookEventUrl && (
                                            <Link
                                                className="underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase text-pu"
                                                href={featuredEvent.facebookEventUrl}
                                                target="_blank"
                                            >
                                                Facebook RSVP
                                            </Link>
                                        )}
                                    </p>
                                    <p className="mb-0 text-xs md:text-l pb-1">
                                        <img
                                            src="/icons/time.png"
                                            className="inline align-text-middle md:align-text-middle"
                                            width="18"
                                            height="18"
                                            alt={t("time")}
                                        />{" "}
                                        {formatOpeningHours(featuredEvent.eventStart, featuredEvent.eventEnd)}
                                    </p>
                                    <address className="mb-0 text-xs md:text-l not-italic">
                                        <img
                                            src="/icons/location.png"
                                            className="inline align-text-middle md:align-text-middle pb-1"
                                            width="18"
                                            height="18"
                                            alt={t("location")}
                                        />{" "}
                                        {featuredEvent.venueName}
                                        {featuredEvent.venueAddress}
                                        <Link
                                            className="underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase text-pu"
                                            href={"https://maps.google.com/maps?q=" + featuredEvent.venueAddress}
                                            target="_blank"
                                        >
                                            {t("getDirections")}
                                        </Link>
                                    </address>
                                    <p className="mb-0 text-xs  md:text-l">
                                        <img
                                            src="/icons/ticket.png"
                                            className="inline align-text-middle md:align-text-middle pb-1"
                                            width="18"
                                            height="18"
                                            alt={t("tickets")}
                                        />{" "}
                                        {featuredEvent.coverFee ? featuredEvent.coverFee : t("freeToAttend")}
                                        {featuredEvent.callToAction && (
                                            <Link
                                                className="underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase"
                                                href={featuredEvent.callToAction.url}
                                                target="_blank"
                                            >
                                                {locale === "sv"
                                                    ? featuredEvent.callToAction.titleSve
                                                    : featuredEvent.callToAction.titleEng}
                                            </Link>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {featuredEvent.callToAction && (
                                <>
                                    <Link
                                        href={featuredEvent.callToAction.url}
                                        target="_blank"
                                        className="button cta bg-purple-800 text-white border-2"
                                    >
                                        <img
                                            src="/icons/buy-ticket.png"
                                            className="inline align-text-bottom md:align-text-top"
                                            width="18"
                                            height="18"
                                            aria-hidden="true"
                                        />{" "}
                                        {locale === "sv"
                                            ? featuredEvent.callToAction.titleSve
                                            : featuredEvent.callToAction.titleEng}
                                    </Link>
                                    <Link
                                        className="button more bg-black text-gray-500  border-gray-500 border-2"
                                        data-eo-form-toggle-id="2b5e1218-c793-11ef-a7c8-9d7832b0d31b"
                                        href="#"
                                    >
                                        {t("remindMe")}
                                    </Link>
                                </>
                            )}
                            {!featuredEvent.callToAction && (
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
                                        {t("remindMe")}
                                    </Link>
                                </>
                            )}
                        </div>
                        <img src="/down.png" className="mb-4" alt={t("scrollDown")} />
                    </>
                )}
            </section>
        </>
    );
}
