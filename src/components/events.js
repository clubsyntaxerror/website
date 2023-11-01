"use client"
import React from 'react';
import SmoothCollapse from 'react-smooth-collapse';

export default function Events({events}) {
    const [expanded, setExpanded] = React.useState(0)

    return (
            events.map((event, index) => {
            if(index === 0) {
                return (
                <>
                    <h2>Our events</h2>
                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.eventName}{expanded === index ? '' : ' ▾'}</h3>
                    <SmoothCollapse expanded={expanded === index}>
                        <p className='mb-0'>{event.longDate}</p>
                        <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                        <p className='mb-0'>Doors open {event.openingHours} </p>
                        <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                        {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                            <p>
                            <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                            </p>
                        )}
                    </SmoothCollapse>
                </>
                )
            } else if(index === 1) {
                return (
                <>
                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.eventName}{expanded === index ? '' : ' ▾'}</h3>
                    <SmoothCollapse expanded={expanded === index}>
                        <p className='mb-0'>{event.longDate}</p>
                        <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                        <p className='mb-0'>Doors open {event.openingHours} </p>
                        <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                        {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                        <p>
                        <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                        </p>
                        )}            
                    </SmoothCollapse>
                </>
                )
            } else {
                return (
                <>
                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.eventName}{expanded === index ? '' : ' ▾'}</h3>
                    <SmoothCollapse expanded={expanded === index}>
                        <p className='mb-0'>{event.longDate}</p>
                        <p className='mb-0'>{event.venueName}{event.venueAddress ? ', ' + event.venueAddress : ''}</p>
                        <p className='mb-0'>Doors open {event.openingHours} </p>
                        <p>{event.optionalCoverFee ? 'Admission ' + event.optionalCoverFee + ' SEK' : ''} </p>
                        {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                        <p>
                        <Link href={event.optionalCallToActionUrl} target="_blank" className='smallbutton bg-purple-800'>{event.optionalCallToActionTitle}</Link>
                        </p>
                        )}
                    </SmoothCollapse>
                </>
                )
            }
        })
    )
}