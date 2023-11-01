"use client"
import React from 'react';
import SmoothCollapse from 'react-smooth-collapse';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export default function Events({events}) {
    const [expanded, setExpanded] = React.useState(0)

    return (
        <>
            <h2>Our events</h2>
            <ResponsiveMasonry columnsCountBreakPoints={{768: 1, 1024: 2, 1600: 3}}>
                <Masonry>
                    {
                        events.map((event, index) => {
                            if(index === 0) {
                                return (
                                    <div key={index}>
                                        <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated mb-0'>{expanded === index ? '' : '> '}{event.eventName}{expanded === index ? ' ˅' : ''}</h3>
                                        <SmoothCollapse expanded={expanded === index}>
                                            <p>{event.eventDescription}</p>
                                            <div className="pl-6 relative">
                                                <div className='ping'></div>
                                                <div className='ball -ml-6'></div>
                                                <p className='mb-0'>{event.longDate}</p>
                                                <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                                                <p className='mb-0'>Doors open {event.openingHours} </p>
                                                <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                                            </div>
                                            {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                                <p>
                                                <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                                                </p>
                                            )}
                                        </SmoothCollapse>
                                    </div>
                                )
                            } else if(index === 1) {
                                return (
                                <div key={index}>
                                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{expanded === index ? '' : '> '}{event.eventName}{expanded === index ? ' ˅' : ''}</h3>
                                    <SmoothCollapse expanded={expanded === index}>
                                        <p>{event.eventDescription}</p>
                                        <div className="pl-6 relative">
                                            <div className='ping'></div>
                                            <div className='ball -ml-6'></div>
                                            <p className='mb-0'>{event.longDate}</p>
                                            <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                                            <p className='mb-0'>Doors open {event.openingHours} </p>
                                            <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                                        </div>
                                        {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                        <p>
                                        <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                                        </p>
                                        )}            
                                    </SmoothCollapse>
                                </div>
                                )
                            } else {
                                return (
                                <div key={index}>
                                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{expanded === index ? '' : '> '}{event.eventName}{expanded === index ? ' ˅' : ''}</h3>
                                    <SmoothCollapse expanded={expanded === index}>
                                        <p>{event.eventDescription}</p>
                                        <div className="pl-6 relative">
                                            <div className='ping'></div>
                                            <div className='ball -ml-6'></div>
                                            <p className='mb-0'>{event.longDate}</p>
                                            <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                                            <p className='mb-0'>Doors open {event.openingHours} </p>
                                            <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                                        </div>
                                        {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                        <p>
                                        <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                                        </p>
                                        )}
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