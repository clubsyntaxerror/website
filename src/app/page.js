import Link from 'next/link'
import { getEvents } from './events.js'
import Events from '../components/events.js'

export const revalidate = 600;

export default async function Home() {
  const events = (await getEvents()).slice(1)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <video autoPlay muted loop playsInline className="object-cover w-full h-screen -z-10 zigzag" poster="/video-poster.jpg">         
          <source src="/video.mp4" type="video/mp4"/>       
      </video>            
      <section className='min-h-screen w-full absolute flex flex-col justify-around items-center'>
        <img src="/images/invader-logo.png" className='logo'></img>
        { events[0] && (
          <>
            <div className='bg-black bg-opacity-75 p-6 w-full flex flex-col justify-around items-center'>
              <div className='md:w-2/3 flex flex-col justify-around items-center text-center'>
                <h1 className='rainbow_text_animated'>{events[0].eventName}</h1>
                <p className='text-xl md:text-3xl'>{events[0].eventDescription}</p>
                <p className='mb-0 md:text-xl'>{events[0].longDate} at {events[0].venueName}</p>
              </div>
            </div>
            <div className='flex justify-center'>
              {events[0].optionalCallToActionTitle && events[0].optionalCallToActionUrl && (
                <Link href={events[0].optionalCallToActionUrl} target="_blank" className='button bg-purple-800'>{events[0].optionalCallToActionTitle}</Link>
              )}
              <Link href='#events' className='button more bg-black'>Find out more</Link>
            </div>
          </>
        )}
      </section>
      <section id='events' className='p-6 w-full md:w-2/3'>
        <Events events={events} />
      </section>
      <section className='w-full bg-purple-800 flex flex-col md:items-center'>
        <div className='p-6 md:py-12 md:w-2/3 text-lg'>
          <p>Welcome to Sweden's most magical chipmusic party! Dance the night away and play brand-new or retro video games – all in our uniquely warm and accepting atmosphere.</p>
          <p>Syntax Error is a club night where you'll be in good company if you enjoy playing Street Fighter or Duck Hunt, dancing to video game music, Disney classics and C64 SIDs or simply hiding in the back room playing Magic or any of our other boardgames all night.</p>
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
      <footer className='p-6 flex flex-col w-full md:w-2/3'>
        <h2>Links</h2>
        <ul className='list-disc list-inside'>
          <li><Link href='https://shop.spreadshirt.se/syntax-error/' target='_blank'>Buy t-shirts & warez</Link></li>
          <li><Link href='https://www.facebook.com/SyntaxErrorSthlm/' target='_blank'>Facebook Page</Link></li>
          <li><Link href='https://discord.gg/URhqp3x' target='_blank'>Discord Server</Link></li>
          <li><Link href='https://www.instagram.com/syntaxerrorsthlm/' target='_blank'>Instagram</Link></li>
          <li><Link href='https://www.twitch.tv/syntaxerrorsthlm/videos/' target='_blank'>Twitch</Link></li>
          <li><Link href='https://www.youtube.com/channel/UCitAIsd8SDH4omDTLpf5upg' target='_blank'>YpuTube</Link></li>
          <li><Link href='mailto:info@syntax-error.se'>Email info@syntax-error.se</Link></li>
          <li><Link href='https://www.twitter.com/syntaxsthlm/' target='_blank'>X</Link></li>
        </ul>
        <br />
        <p>
          Svenska Spelmusikfrämjandet © 2002-{new Date().getFullYear()} - Email us at <Link href='mailto:info@syntax-error.se'>info@syntax-error.se</Link> or message us on our <Link href='https://www.facebook.com/SyntaxErrorSthlm/' target='_blank'>Facebook Page</Link> for questions, ideas, corporate and co-op events
        </p>
      </footer>       
    </main>
  )
}