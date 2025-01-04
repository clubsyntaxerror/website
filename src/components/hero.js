"use client"
import Link from 'next/link'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Textra from 'react-textra'
import { useRef, useEffect } from 'react'

export default function Hero({featuredEvent}) {
    const featuredEventAddress = featuredEvent.optionalVenueStreetAddress ? ', ' + featuredEvent.optionalVenueStreetAddress : featuredEvent.venueName === 'H62' ? ', Hornsgatan 62, 118 21 Stockholm' : ''

    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const section = sectionRef.current;

        if (video && section) {
            const resizeObserver = new ResizeObserver(() => {
                video.style.height = section.clientHeight + 'px';
            });

            resizeObserver.observe(section);
            return () => {
                resizeObserver.disconnect();
            };
        }
    }, []);

    return (
        <>
            <video autoPlay muted loop playsInline className="object-cover w-full h-screen -z-10 zigzag" poster="/video-poster.jpg" ref={videoRef}>         
                <source src="/video.mp4" type="video/mp4" />
            </video>      
            <section className='min-h-screen w-full absolute flex flex-col justify-between items-center' ref={sectionRef}>
                <aside className='p-4 w-full absolute top-0 left-0 text-center bg-black bg-opacity-90 text-gray-500'>
                    <Textra effect='simple' data={['Ranked as the #1 activity on Moderskeppet 2024!', '"Syntax Error Stockholm is worth your time. It truly is something special. 🙂"', '"The atmosphere is awesome and nerdy! Play games, listen to blip blop while drinking beers and socialising."', '"Very good place! Amazing crowd and friendly crew and guards in door!"', '"Riktigt kul och annorlunda ställe för den som tröttnat på den gamla vanliga "krogsvängen" och gillar att träffa lite annorlunda och färgstarka människor!"', '"Party! Party! On! When the chip is pulsing this club is pumping!"', '"Tight knit yet open community. Best mixture of different nerd/gamer/underground subcultures or crowds."', '"Machokulturen lyser med sin frånvaro, och jag älskar´t!"', '"The best club for anyone who likes video games, chiptunes, nerds, board games and friendly people."']}  />
                </aside>
                <img src="/images/logo.png" className='logo text-white mt-24 mb-12 md:mt-18' alt='Syntax Error Video Game Party & Nightclub' />
                { featuredEvent && (
                    <>
                        <div className='bg-black bg-opacity-90 p-6 w-full flex flex-col justify-around items-center'>
                            <div className='md:w-2/3 flex flex-col justify-around items-center text-center'>
                                <h2 className='text-white'>Next party</h2>
                                <h1 className='rainbow_text_animated'>{featuredEvent.eventName}</h1>
                                <p className='text-sm md:text-xl text-left text-gray-500'>{featuredEvent.eventDescription}</p>
                                <div className='text-left text-gray-500 relative'>
                                    <div className='ping'></div>
                                    <div className='ball -ml-12'></div>
                                    <p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/date.png' className='inline align-text-mniddle md:align-text-middle' width='18' height='18' alt='Date'/> {featuredEvent.longDate}</p>
                                    <p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/time.png' className='inline align-text-middle md:align-text-middle' width='18' height='18' alt='Time'/> {featuredEvent.openingHours}</p>
                                    <address className='mb-0 text-xs md:text-l not-italic'><img src='/icons/location.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' alt='Location'/> {featuredEvent.venueName}{featuredEventAddress}
                                        {featuredEventAddress && (
                                            <Link className='underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase text-pu' href={'https://maps.google.com/maps?q=' + featuredEventAddress} target='_blank'>Get directions</Link>
                                        )}
                                    </address>
                                    <p className='mb-0 text-xs  md:text-l'><img src='/icons/ticket.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' alt='Tickets'/> {featuredEvent.optionalCoverFee ? featuredEvent.optionalCoverFee + ' SEK' : 'free to attend'}</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            {featuredEvent.optionalCallToActionTitle && featuredEvent.optionalCallToActionUrl && (
                                <>
                                    <Link href={featuredEvent.optionalCallToActionUrl} target="_blank" className='button bg-white text-black'>{featuredEvent.optionalCallToActionTitle}</Link>
                                    <Link className='button more bg-purple-800 text-white border-2 border-white' data-eo-form-toggle-id='2b5e1218-c793-11ef-a7c8-9d7832b0d31b' href='#'><img src='/icons/mail.png' className='inline align-text-bottom md:align-text-top' width='18' height='18' aria-hidden='true' /> Remind me!</Link>
                                </>
                            )}
                            {(!featuredEvent.optionalCallToActionTitle || !featuredEvent.optionalCallToActionUrl) && (
                                <>
                                    <Link className='button more bg-purple-800 text-white border-2 border-white' data-eo-form-toggle-id='2b5e1218-c793-11ef-a7c8-9d7832b0d31b' href='#'><img src='/icons/mail.png' className='inline align-text-bottom md:align-text-top' width='18' height='18' aria-hidden='true' /> Remind me!</Link>
                                </>
                            )}     
                        </div>
                        <img src="/down.png" className='mb-4' alt='Scroll down for more content'/>
                    </>
                )}
            </section>
        </>
    );
}
