"use client"
import Link from 'next/link'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

export default function Hero({featuredEvent}) {
    return (
        <>
            <video autoPlay muted loop playsInline className="object-cover w-full h-screen -z-10 zigzag" poster="/video-poster.jpg">         
                <source src="/video.mp4" type="video/mp4"/>       
            </video>            
            <section className='min-h-screen w-full absolute flex flex-col justify-around items-center'>
                <img src="/images/logo.png" className='logo'></img>
                { featuredEvent && (
                <>
                    <div className='bg-black bg-opacity-75 p-6 w-full flex flex-col justify-around items-center'>
                        <div className='md:w-2/3 flex flex-col justify-around items-center text-center'>
                            <h2>Next party</h2>
                            <h1 className='rainbow_text_animated'>{featuredEvent.eventName}</h1>
                            <p className='text-xl md:text-3xl text-left'>{featuredEvent.eventDescription}</p>
                            <div className='text-left'>
                                <p className='mb-0 md:text-xl'><img src='/icons/date.png' className='inline align-text-top' width='18' height='18' /> {featuredEvent.longDate}</p>
                                <p className='mb-0 md:text-xl'><img src='/icons/time.png' className='inline align-text-top' width='18' height='18' /> {featuredEvent.openingHours}</p>
                                <p className='mb-0 md:text-xl'><img src='/icons/location.png' className='inline align-text-top' width='18' height='18' /> {featuredEvent.venueName}</p>
                                <p className='mb-0 md:text-xl'><img src='/icons/ticket.png' className='inline align-text-top' width='18' height='18' /> {featuredEvent.optionalCoverFee ? featuredEvent.optionalCoverFee + ' SEK' : 'free to attend'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                    {featuredEvent.optionalCallToActionTitle && featuredEvent.optionalCallToActionUrl && (
                            <>
                                <Link href={featuredEvent.optionalCallToActionUrl} target="_blank"
                                      className='button bg-white text-black'>{featuredEvent.optionalCallToActionTitle}</Link>
                                <Link href='#events' className='button more bg-black'>Tell me more</Link>
                        </>
                    )}
                    {(!featuredEvent.optionalCallToActionTitle || !featuredEvent.optionalCallToActionUrl) && (
                        <Link href='#events' className='button more bg-black'>Tell me more</Link>
                    )}              
                    </div>
                </>
                )}
                <img src="/down.png"/>
            </section>
        </>
    )
}