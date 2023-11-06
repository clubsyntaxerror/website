import Link from 'next/link'

export default function Hero({featuredEvent}) {
    return (
        <>
            <video autoPlay muted loop playsInline className="object-cover w-full h-screen -z-10 zigzag" poster="/video-poster.jpg">         
                <source src="/video.mp4" type="video/mp4"/>       
            </video>            
            <section className='min-h-screen w-full absolute flex flex-col justify-around items-center'>
                <img src="/images/invader-logo.png" className='logo'></img>
                { featuredEvent && (
                <>
                    <div className='bg-black bg-opacity-75 p-6 w-full flex flex-col justify-around items-center'>
                    <div className='md:w-2/3 flex flex-col justify-around items-center text-center'>
                        <h1 className='rainbow_text_animated'>{featuredEvent.eventName}</h1>
                        <p className='text-xl md:text-3xl'>{featuredEvent.eventDescription}</p>
                        <p className='mb-0 md:text-xl'>{featuredEvent.longDate} at {featuredEvent.venueName}</p>
                    </div>
                    </div>
                    <div className='flex justify-center'>
                    {featuredEvent.optionalCallToActionTitle && featuredEvent.optionalCallToActionUrl && (
                        <>
                        <Link href={featuredEvent.optionalCallToActionUrl} target="_blank" className='button bg-white text-black'>{events[0].optionalCallToActionTitle}</Link>
                        <Link href='#events' className='button more bg-black'>Continue</Link>
                        </>
                    )}
                    {(!featuredEvent.optionalCallToActionTitle || !featuredEvent.optionalCallToActionUrl) && (
                        <>
                        <Link href='#events' className='button more bg-black'>Press Start</Link>
                        </>
                    )}              
                    </div>
                </>
                )}
            </section>
        </>
    )
}