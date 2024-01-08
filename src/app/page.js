import Link from 'next/link'
import { getEvents } from './eventData.js'
import Hero from '../components/hero.js'
import Events from '../components/events.js'
import Photos from '../components/photos.js'
import Crew from '../components/crew.js'
import Rules from '../components/rules.js'
import Links from '../components/links.js'

export default async function Home() {
  const events = (await getEvents()).filter(event => {return event.startDate >= new Date()}).slice(0,3)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero featuredEvent={events[0]} />
      <section id='events' className='p-6 md:pt-12 w-full md:w-2/3'>
        <Events events={events} />
      </section>
      <section className='w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag'>
        <div className='p-6 md:py-12 md:w-2/3 md:text-xl'>
          <p>Welcome to Stockholm's Video Game Nightclub! Dance the night away to video game music and play brand-new or retro video games – all in our uniquely warm and accepting atmosphere.</p>
          <p>Syntax Error is a nightclub where you'll be in good company if you enjoy playing Street Fighter or Duck Hunt, dancing to video game music, Disney classics and C64 SIDs or simply hiding in the back room playing Magic or any of our other boardgames all night.</p>
        </div>
      </section>
      <section className='p-6 md:py-12 w-full md:w-2/3'>
        <Photos />
      </section>
      <section className='p-6 w-full md:w-2/3'>
        <Crew />
      </section>
      <section className='p-6 w-full md:w-2/3'>
        <h2>Artists that performed at Syntax Error so far</h2>
        <p className='rainbow_text_animated'>047, Algar, Blastromen, Bossfight, Brandon Walsh, Chipzel, Dubmood, Dunderpatrullen, DJ Diskmachine, FantomenK, Fastbom, Goto80, Hello World, Instant Remedy, Irving Force, Maktone, MegaNeko, Moogen, Ninjaspark, Nordloef, Powerplay, RoccoW, Rymdkraft, SabrePulse, Savlonic, Shirobon, Starchild, Tekmann, Thermostatic, Ultrasyd, USK, Wiklund, Zabutom, Zalza</p>
      </section>
      <section className='p-6 w-full md:w-2/3'>
        <Rules />
      </section>
      <section className='p-6 w-full md:w-2/3'>
        <Links />
      </section>
      <footer className='p-6 w-full md:w-2/3'>
        <h2>Svenska Spelmusikfrämjandet © 2002-{new Date().getFullYear()}</h2>
        <p>
          Email us at <Link href='mailto:info@syntax-error.se' className='smallbutton mr-2'>info@syntax-error.se</Link> or message us on our <Link href='https://www.facebook.com/SyntaxErrorSthlm/' target='_blank' className='smallbutton mr-2'>Facebook Page</Link> for questions, ideas, corporate and co-op events
        </p>
      </footer>       
    </main>
  )
}
