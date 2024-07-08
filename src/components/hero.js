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
                        <h1 className='rainbow_text_animated'>{featuredEvent.eventName}</h1>
                        <p className='text-xl md:text-3xl'>{featuredEvent.eventDescription}</p>
                        <p className='mb-0 md:text-xl'>{featuredEvent.longDate} at {featuredEvent.venueName}</p>
                        <p className='mb-0 md:text-xl'>{featuredEvent.openingHours}{featuredEvent.optionalCoverFee ? ', admission ' + featuredEvent.optionalCoverFee + ' SEK' : ''} </p>
                    </div>
                    </div>
                    <div className='flex justify-center'>
                    {featuredEvent.optionalCallToActionTitle && featuredEvent.optionalCallToActionUrl && (
                        <>
                        <Link href={featuredEvent.optionalCallToActionUrl} target="_blank" className='button bg-white text-black'>{featuredEvent.optionalCallToActionTitle}</Link>
                        <Link href='#events' className='button more bg-black'>Find out more</Link>
                        </>
                    )}
                    {(!featuredEvent.optionalCallToActionTitle || !featuredEvent.optionalCallToActionUrl) && (
                        <>
                        <Popup
                            trigger={open => (
                                <button className="button bg-white text-black">{open ? 'OK' : 'No presale'}</button>
                            )}
                            position="top left"
                            closeOnDocumentClick
                            >
                                {featuredEvent.optionalCoverFee && (
                                    <div className='text-black'><p>Tickets to the next event are currently only sold at the door.</p><p>We accept cards, Swish and cash.</p></div>
                                )}
                                {!featuredEvent.optionalCoverFee && (
                                    <div className='text-black'><p>This event is free to attend.</p></div>
                                )}
                        </Popup>                   
                        <Link href='#events' className='button more bg-black'>Find out more</Link>
                        </>
                    )}              
                    </div>
                </>
                )}
            </section>
        </>
    )
}