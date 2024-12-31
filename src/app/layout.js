import './globals.css'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/react';

const freePixel = localFont({ src: '../fonts/freepixel.woff2', variable: '--font-freepixel', display: 'swap' })
const microKnight = localFont({ src: '../fonts/microknight.woff2', variable: '--font-microknight', display: 'swap' })

export const metadata = {
  title: 'Syntax Error - Stockholm\'s Video Game Nightclub',
  description: 'Dance the night away to video game music and play brand-new or retro video games – all in our uniquely warm and accepting atmosphere.',
  openGraph: {
    title: 'Syntax Error - Stockholm\'s Video Game Nightclub',
    description: 'Dance the night away to video game music and play brand-new or retro video games – all in our uniquely warm and accepting atmosphere.',
    url: 'https://syntax-error.se',
    images: [
      {
        url: 'https://syntax-error.se/video-poster.jpg',
        width: 1920,
        height: 1080,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={microKnight.className}>
        {children}
        <Analytics />
        <script async src="https://eocampaign1.com/form/2b5e1218-c793-11ef-a7c8-9d7832b0d31b.js" data-form="2b5e1218-c793-11ef-a7c8-9d7832b0d31b"></script>
      </body>
    </html>
  )
}
