import './globals.css'
import localFont from 'next/font/local'

const freePixel = localFont({ src: '../fonts/freepixel.woff2', variable: '--font-freepixel', display: 'swap' })
const microKnight = localFont({ src: '../fonts/microknight.woff2', variable: '--font-microknight', display: 'swap' })

export const metadata = {
  title: 'Syntax Error Stockholm - The Club Night',
  description: 'A Club Night for Chiptune, Computer, Video & Board Game Enthusiasts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={microKnight.className}>{children}</body>
    </html>
  )
}
