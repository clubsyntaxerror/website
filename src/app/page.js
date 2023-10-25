import Link from 'next/link'
import { getEvents } from './events.js'

export default async function Home() {
  const events = await (await getEvents()).slice(1)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <video autoPlay muted loop playsInline className="object-cover w-full h-screen -z-10 zigzag" poster="/video-poster.jpg">         
          <source src="/video.mp4" type="video/mp4"/>       
      </video>            
      <section className='p-6 min-h-screen w-full md:w-2/3 absolute flex flex-col justify-around items-center'>
        <img src="/images/invader-logo.png" className='logo'></img>
        { events[0] && (
          <div>
            <h1>{events[0].optionalEventName ? events[0].optionalEventName : "Syntax Error "}</h1>
            <p>{events[0].optionalEventDescription ? events[0].optionalEventDescription : "Welcome to Sweden's most magical chipmusic party!"}</p>
            <p>{events[0].startDate} at {events[0].venueName}</p>
            <div className='flex justify-center'>
              {events[0].optionalCallToActionTitle && events[0].optionalCallToActionUrl && (
                <Link href={events[0].optionalCallToActionUrl} target="_blank" className='button bg-purple-800'>{events[0].optionalCallToActionTitle}</Link>
              )}
              <Link href='#events' className='button more bg-black'>Find out more</Link>
            </div>
          </div>
        )}
      </section>
      <section id='events' className='p-6 w-full md:w-2/3'>
      {events.map((event, index) => {
        const eventName = event.optionalEventName ? event.optionalEventName : 'Syntax Error ' // and date
        if(index === 0) {
          return (
            <>
              <h2>Next up</h2>
              <h3>{eventName}</h3>
              <p>{event.startDate} at {event.venueName}</p>
              {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                <p>
                <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                </p>
              )}
            </>
          )
        } else if(index === 1) {
          return (
            <>
              <h2 className='mt-12'>Future events</h2>
              <h3>{eventName}</h3>
              <p>{event.startDate} at {event.venueName}</p>
              {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                <p>
                <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                </p>
              )}            
            </>
          )
        } else {
          return (
            <>
              <h3>{eventName}</h3>
              <p>{event.startDate} at {event.venueName}</p>
              {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                <p>
                <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                </p>
              )}
            </>
          )
        }
      })}
      </section>
      <section className='w-full bg-purple-800 flex flex-col md:items-center'>
        <div className='p-6 md:py-12 md:w-2/3'>
          <p>Welcome to Sweden's most magical chipmusic party! Dance the night away and play brand-new or retro video games – all in our uniquely warm and accepting atmosphere.</p>
        </div>
      </section>         
      <section className='p-6 w-full md:w-2/3'>
        <h2>Our DJ crew</h2>
        <p>Hakushi, Ventura, Velo, Fastbom, Weyland, Kim, MissStabby, Jor-el</p>
      </section>
      <section className='p-6 w-full md:w-2/3'>
        <h2>Our crew</h2>
        <p>Njursten, Toolsmonkey, Zaz</p>
      </section>
      <section className='p-6 w-full md:w-2/3'>
        <h2>The board of Svenska Spelmusikfrämjandet</h2>
        <p>Hakushi, Weyland, Matti, MissStabby, Jor-el</p>
      </section>         
      <section className='p-6 w-full md:w-2/3'>
        <h2>Live-acts so far</h2>
        <p>047, Algar, Blastromen, Bossfight, Brandon Walsh, Chipzel, Dubmood, Dunderpatrullen, DJ Diskmachine, FantomenK, Fastbom, Goto80, Hello World, Instant Remedy, Irving Force, Maktone, MegaNeko, Moogen, Nordloef, Powerplay, RoccoW, Rymdkraft, SabrePulse, Savlonic, Shirobon, Starchild, Tekmann, Thermostatic, Ultrasyd, USK, Wiklund, Zabutom, Zalza</p>
      </section>      
      <section className='p-6 w-full md:w-2/3'>
        <h2>Our rules</h2>
        <h3>Be respectful</h3>
        <p>
          Syntax Error is a place where everyone is welcome, regardless of gender, sexual orientation, ethnicity, religion or favorite Star Trek captain. The only thing that is not welcome is acting disrespectful against other guests, the venue staff or the crew.
        </p>
        <h3>No harassment of any kind</h3>
        <p>
          This includes all forms of unsolicited touching, grabbing, inappropriate gestures or comments or "jokes" at the expense of others.
        </p>
        <p>
          If someone asks to be left alone, respect that, move along and don't take it personally. Always make sure you have consent before touching or otherwise engaging with other guests. If you're unsure, just ask, and no means no.
        </p>
        <h3>Reach out to our crew</h3>
        <p>
          If someone is making you feel uneasy, if you need to talk to someone confidentially or if you just want to chat, grab the closest person wearing a red Syntax Error crew t-shirt. We in the crew are dedicated to making sure everyone has a good time during our events.
        </p>
        <p>
          You can also email us at info@syntax-error.se if you need to get in contact with us and don't feel like talking to a person directly. Talking in person is however the preferred way if we need to act on another guest that is behaving inappropriately so that we can intervene immediately.
        </p>
        <p>
          If you can't get behind these simple rules, please refrain from visiting our events. If you purposely do not comply with the rules during an event you WILL be ejected from the venue without question.
        </p>
        <p>
          With that said, we in the Syntax Error crew hope that you will have a most awesome time at our events, and if you're not, please let us know.
        </p>
      </section>
      {/* <footer className='p-6 flex flex-col w-full md:w-2/3'>
        <h2>Links</h2>
        <p>bla bla</p>
      </footer>        */}
    </main>
  )
}