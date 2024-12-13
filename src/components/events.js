"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SmoothCollapse from 'react-smooth-collapse'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Events({events}) {
    const [expanded, setExpanded] = React.useState(0)

    const [desktop, setDesktop] = useState(false)
    
      useEffect(() => {
        setDesktop(window.matchMedia("(min-width: 1500px)").matches)

        window
        .matchMedia("(min-width: 1500px)")
        .addEventListener('change', e => setDesktop( e.matches ));
      }, []);

    return (
        <>
            { events.length > 0 && (
                <h2>More upcoming parties</h2>
            )}
            { events.length === 0 && (
                <h2>No more parties planned right now, come back later for updates or join our Discord server and ask us there.</h2>
            )}
            <ResponsiveMasonry columnsCountBreakPoints={{768: 1, 1500: 3}}>
                <Masonry gutter='64px'>
                    {
                        events.map((event, index) => {
                            if(index === 0) {
                                return (
                                    <div key={index}>
                                        <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated mb-0'>{event.shortDate} {event.eventName}{expanded === index ? '' : '\u00A0>'}</h3>
                                        <SmoothCollapse expanded={expanded === index || desktop}>
                                            <p>{event.eventDescription}</p>
                                            <div className="pl-6 relative">
                                                <div className='ping'></div>
                                                <div className='ball -ml-12'></div>
                                                <p className='mb-0'>{event.longDate}</p>
                                                <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                                                <p className='mb-0'>Doors open {event.openingHours} </p>
                                                <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                                                {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                                    <p>
                                                    <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton'>{event.optionalCallToActionTitle}</Link>
                                                    </p>
                                                )}
                                            </div>
                                        </SmoothCollapse>
                                    </div>
                                )
                            } else if(index === 1) {
                                return (
                                <div key={index}>
                                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.shortDate} {event.eventName}{expanded === index ? '' : '\u00A0>'}</h3>
                                    <SmoothCollapse expanded={expanded === index || desktop}>
                                        <p>{event.eventDescription}</p>
                                        <div className="pl-6 relative">
                                            <div className='ping'></div>
                                            <div className='ball -ml-6'></div>
                                            <p className='mb-0'>{event.longDate}</p>
                                            <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                                            <p className='mb-0'>Doors open {event.openingHours} </p>
                                            <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                                            {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                            <p>
                                            <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton'>{event.optionalCallToActionTitle}</Link>
                                            </p>
                                            )}            
                                        </div>
                                    </SmoothCollapse>
                                </div>
                                )
                            } else {
                                return (
                                <div key={index}>
                                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.shortDate} {event.eventName}{expanded === index ? '' : '\u00A0>'}</h3>
                                    <SmoothCollapse expanded={expanded === index || desktop}>
                                        <p>{event.eventDescription}</p>
                                        <div className="pl-6 relative">
                                            <div className='ping'></div>
                                            <div className='ball -ml-6'></div>
                                            <p className='mb-0'>{event.longDate}</p>
                                            <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                                            <p className='mb-0'>Doors open {event.openingHours} </p>
                                            <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                                            {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                            <p>
                                            <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton'>{event.optionalCallToActionTitle}</Link>
                                            </p>
                                            )}
                                        </div>
                                    </SmoothCollapse>
                                </div>
                                )
                            }
                    })
                }
                </Masonry>
            </ResponsiveMasonry>
        </>
    )
}