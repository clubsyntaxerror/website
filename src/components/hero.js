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
            <section className='min-h-screen w-full absolute flex flex-col justify-around items-center'>
                <img src="/images/logo.png" className='logo'></img>
                { featuredEvent && (
                <>
                    <div className='bg-black bg-opacity-75 p-6 w-full flex flex-col justify-around items-center'>
                        <div className='md:w-2/3 flex flex-col justify-around items-center text-center'>
                            <h2>Coming up</h2>
                            <h1 className='rainbow_text_animated'>{featuredEvent.eventName}</h1>
                            <p className='text-sm md:text-3xl text-left'>{featuredEvent.eventDescription}</p>
                            <div className='text-left'>
                                <p className='mb-0 text-xs md:text-xl'><img src='/icons/date.png' className='inline align-text-top' width='18' height='18' /> {featuredEvent.longDate}</p>
                                <p className='mb-0 text-xs md:text-xl'><img src='/icons/time.png' className='inline align-text-top' width='18' height='18' /> {featuredEvent.openingHours}</p>
                                <address className='mb-0 text-xs md:text-xl not-italic'><img src='/icons/location.png' className='inline align-text-top' width='18' height='18' /> {featuredEvent.venueName}{featuredEventAddress}
                                    {featuredEventAddress && (
                                        <Link className='underline text-xs md:text-sm ml-4 align-top smallbutton' href={'https://maps.google.com/maps?q=' + featuredEventAddress} target='_blank'>OPEN MAP</Link>
                                    )}
                                </address>
                                <p className='mb-0 text-xs  md:text-xl'><img src='/icons/ticket.png' className='inline align-text-top' width='18' height='18' /> {featuredEvent.optionalCoverFee ? featuredEvent.optionalCoverFee + ' SEK' : 'free to attend'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                    {featuredEvent.optionalCallToActionTitle && featuredEvent.optionalCallToActionUrl && (
                            <>
                                <Link href={featuredEvent.optionalCallToActionUrl} target="_blank"
                                      className='button bg-white text-black'>{featuredEvent.optionalCallToActionTitle}</Link>
                                {/* <Link href='#events' className='button more bg-black'>About us</Link> */}
                        </>
                    )}
                    {/* {(!featuredEvent.optionalCallToActionTitle || !featuredEvent.optionalCallToActionUrl) && (
                        <Link href='#events' className='button more bg-black'>About us</Link>
                    )}               */}
                    </div>
                </>
                )}
                <img src="/down.png"/>
            </section>
        </>
    )
}