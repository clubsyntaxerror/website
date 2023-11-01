import './globals.css'
import localFont from 'next/font/local'

const freePixel = localFont({ src: './freepixel.woff2', variable: '--font-freepixel', display: 'swap' })

export const metadata = {
  title: 'Syntax Error Stockholm - The Club Night',
  description: 'A Club Night for Chiptune, Computer, Video & Board Game Enthusiasts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={freePixel.className}>{children}</body>
    </html>
  )
}
