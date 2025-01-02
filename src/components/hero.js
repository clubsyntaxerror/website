"use client"
import Link from 'next/link'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export default function Hero({featuredEvent}) {
    const featuredEventAddress = featuredEvent.optionalVenueStreetAddress ? ', ' + featuredEvent.optionalVenueStreetAddress : featuredEvent.venueName === 'H62' ? ', Hornsgatan 62, 118 21 Stockholm' : ''

    return (
        <>
            <video autoPlay muted loop playsInline className="object-cover w-full h-screen -z-10 zigzag" poster="/video-poster.jpg">         
                <source src="/video.mp4" type="video/mp4"/>       
            </video>      
            <section className='min-h-screen w-full absolute flex flex-col justify-between items-center'>
                <aside className='p-4 w-full text-center bg-black bg-opacity-90 text-gray-500'>Ranked as the #1 activity on Moderskeppet 2024!</aside>
                <img src="/images/logo.png" className='logo text-white' />
                { featuredEvent && (
                <>
                    <div className='bg-black bg-opacity-90 p-6 w-full flex flex-col justify-around items-center'>
                        <div className='md:w-2/3 flex flex-col justify-around items-center text-center'>
                            <h2 className='text-white'>Next party</h2>
                            <h1 className='rainbow_text_animated'>{featuredEvent.eventName}</h1>
                            <p className='text-sm md:text-xl text-left text-gray-500'>{featuredEvent.eventDescription}</p>
                            <div className='text-left text-gray-500 relative'>
                                <div className='ping hero'></div>
                                <div className='ball -ml-12'></div>
                                <p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/date.png' className='inline align-text-mniddle md:align-text-middle' width='18' height='18' /> {featuredEvent.longDate}</p>
                                <p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/time.png' className='inline align-text-middle md:align-text-middle' width='18' height='18' /> {featuredEvent.openingHours}</p>
                                <address className='mb-0 text-xs md:text-l not-italic'><img src='/icons/location.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' /> {featuredEvent.venueName}{featuredEventAddress}
                                    {featuredEventAddress && (
                                        <Link className='underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase text-pu' href={'https://maps.google.com/maps?q=' + featuredEventAddress} target='_blank'>Get directions</Link>
                                    )}
                                </address>
                                <p className='mb-0 text-xs  md:text-l'><img src='/icons/ticket.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' /> {featuredEvent.optionalCoverFee ? featuredEvent.optionalCoverFee + ' SEK' : 'free to attend'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                    {featuredEvent.optionalCallToActionTitle && featuredEvent.optionalCallToActionUrl && (
                        <>
                            <Link href={featuredEvent.optionalCallToActionUrl} target="_blank" className='button bg-white text-black'>{featuredEvent.optionalCallToActionTitle}</Link>
                            <Link className='button more bg-purple-800 text-white border-2 border-white' data-eo-form-toggle-id='2b5e1218-c793-11ef-a7c8-9d7832b0d31b' href='#'><img src='/icons/mail.png' className='inline align-text-bottom md:align-text-top' width='18' height='18' /> Remind me!</Link>
                        </>
                    )}
                    {(!featuredEvent.optionalCallToActionTitle || !featuredEvent.optionalCallToActionUrl) && (
                        <>
                            <Link className='button more bg-purple-800 text-white border-2 border-white' data-eo-form-toggle-id='2b5e1218-c793-11ef-a7c8-9d7832b0d31b' href='#'><img src='/icons/mail.png' className='inline align-text-bottom md:align-text-top' width='18' height='18' /> Remind me!</Link>
                        </>
                    )}              
                    </div>
                    <img src="/down.png" className='mb-4'/>
                </>
                )}
            </section>
        </>
    )
}