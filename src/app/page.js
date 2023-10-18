import Image from 'next/image'
import localFont from 'next/font/local'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <video autoPlay muted loop playsInline className="object-cover w-full h-full fixed -z-10">         
          <source src="/video.mp4" type="video/mp4"/>       
      </video>      
      <section className='p-6 min-h-screen'>
        <h1>Syntax Error Halloween Special</h1>
        <p>It's finally Halloween time! All the artists, all the video games and all the cosplay you'd expect is right here! </p>
        <div className='flex justify-center'>
          <button>Book now!</button>
          <button className='more'>Find out more</button>
        </div>
      </section>
      <section>
        <h2>Here is more</h2>
        <p>bla bla</p>
      </section>
    </main>
  )
}
