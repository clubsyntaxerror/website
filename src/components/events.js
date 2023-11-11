"use client"
import React from 'react'
import Link from 'next/link'
import SmoothCollapse from 'react-smooth-collapse'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Events({events}) {
    const [expanded, setExpanded] = React.useState(0)

    return (
        <>
            <h2>Our next events</h2>
            <ResponsiveMasonry columnsCountBreakPoints={{768: 1, 1500: 3}} ga>
                <Masonry gutter='16px'>
                    {
                        events.map((event, index) => {
                            if(index === 0) {
                                return (
                                    <div key={index}>
                                        <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated mb-0'>{event.eventName}{expanded === index ? '' : ' >'}</h3>
                                        <SmoothCollapse expanded={expanded === index}>
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
                                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.eventName}{expanded === index ? '' : ' >'}</h3>
                                    <SmoothCollapse expanded={expanded === index}>
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
                                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.eventName}{expanded === index ? '' : ' >'}</h3>
                                    <SmoothCollapse expanded={expanded === index}>
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