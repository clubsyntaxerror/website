import Link from 'next/link'

export default function Links() {
    return (
        <>
            <h2>Links</h2>
            <section className="links">
                <Link href='https://discord.gg/URhqp3x' target='_blank' className='smallbutton'><img src="/social/discord.svg"></img></Link>
                <Link href='https://shop.syntax-error.se' target='_blank' className='smallbutton'><img src="/social/spreadshirt.svg"></img></Link>
                <Link href='https://www.facebook.com/SyntaxErrorSthlm/' target='_blank' className='smallbutton'><img src="/social/facebook.svg"></img></Link>
                <Link href='https://tiktok.com/@syntaxerrorsthlm' target='_blank' className='smallbutton'><img src="/social/tiktok.svg"></img></Link>
                <Link href='https://www.instagram.com/syntaxerrorsthlm/' target='_blank' className='smallbutton'><img src="/social/instagram.svg"></img></Link>
                <Link href='https://www.twitch.tv/syntaxerrorsthlm/videos/' target='_blank' className='smallbutton'><img src="/social/twitch.svg"></img></Link>
                <Link href='https://www.youtube.com/channel/UCitAIsd8SDH4omDTLpf5upg' target='_blank' className='smallbutton'><img src="/social/youtube.svg"></img></Link>
                <Link href='https://www.twitter.com/syntaxsthlm/' target='_blank' className='smallbutton'><img src="/social/twitter.svg"></img></Link>
                <Link href='https://github.com/syntaxerrorsthlm' target='_blank' className='smallbutton'><img src="/social/github.svg"></img></Link>
                <Link href='https://g.page/r/CVTC7Oz0rQTWEBM' target='_blank' className='smallbutton'><img src="/social/google.svg"></img></Link>
            </section>
        </>
   )
}