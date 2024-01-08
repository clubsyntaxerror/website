"use client"
import React from 'react'
import Link from 'next/link'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Rules({ events }) {

    return (
        <>
            <h2>Our rules</h2>
            <ResponsiveMasonry columnsCountBreakPoints={{ 768: 1, 1500: 2 }}>
                <Masonry gutter='32px'>
                    <div>
                        <h3>Be respectful</h3>
                        <p>
                            Syntax Error is a place where everyone is welcome, regardless of gender, sexual orientation, ethnicity, religion or favorite Star Trek captain. The only thing that is not welcome is acting disrespectful against other guests, the venue staff or the crew.
                        </p>
                        <p>
                            This includes all forms of unsolicited touching, grabbing, inappropriate gestures or comments or "jokes" at the expense of others.
                        </p>
                        <h3>No harassment of any kind</h3>
                        <p>
                            If someone asks to be left alone, respect that, move along and don't take it personally. Always make sure you have consent before touching or otherwise engaging with other guests. If you're unsure, just ask, and no means no.
                        </p>
                    </div>
                    <div>
                        <h3>Reach out to our crew</h3>
                        <p>
                            If someone is making you feel uneasy, if you need to talk to someone confidentially or if you just want to chat, grab the closest person wearing a red Syntax Error crew t-shirt. We in the crew are dedicated to making sure everyone has a good time during our events.
                        </p>
                        <p>
                            You can also email us at <Link href='mailto:info@syntax-error.se' className='smallbutton'>info@syntax-error.se</Link> if you need to get in contact with us and don't feel like talking to a person directly. Talking in person is however the preferred way if we need to act on another guest that is behaving inappropriately so that we can intervene immediately.
                        </p>
                        <p>
                            If you can't get behind these simple rules, please refrain from visiting our events. If you purposely do not comply with the rules during an event you WILL be ejected from the venue without question.
                        </p>
                        <p>
                            With that said, we in the Syntax Error crew hope that you will have a most awesome time at our events, and if you're not, please let us know.
                        </p>
                    </div>
                </Masonry>
            </ResponsiveMasonry>
            <img src="/images/invader-dance.gif"></img>
        </>
    )
}