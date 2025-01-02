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
                <h2 className='text-center text-white mb-4'>Party calendar</h2>
            )}
            <ResponsiveMasonry columnsCountBreakPoints={{768: 1, 1500: 3}}>
                <Masonry gutter='64px'>
                    {
                        events.map((event, index) => {
                            const eventAddress = event.optionalVenueStreetAddress ? ', ' + event.optionalVenueStreetAddress : event.venueName === 'H62' ? ', Hornsgatan 62, 118 21 Stockholm' : ''

                            if(index === 0) {
                                return (
                                    <div key={index} className='text-gray-500'>
                                        <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated mb-0'>{event.shortDate} {event.eventName}{expanded === index ? '' : '\u00A0>'}</h3>
                                        <SmoothCollapse expanded={expanded === index || desktop}>
                                            <p>{event.eventDescription}</p>
                                            <div className="pl-6 relative">
                                                <div className='ping'></div>
                                                <div className='ball -ml-12'></div><p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/date.png' className='inline align-text-mniddle md:align-text-middle' width='18' height='18' /> {event.longDate}</p>
                                                <p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/time.png' className='inline align-text-middle md:align-text-middle' width='18' height='18' /> {event.openingHours}</p>
                                                <address className='mb-0 text-xs md:text-l not-italic events'><img src='/icons/location.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' /> {event.venueName}
                                                    {eventAddress && (
                                                        <Link className='underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase' href={'https://maps.google.com/maps?q=' + eventAddress} target='_blank'>Get directions</Link>
                                                    )}
                                                </address>
                                                <p className='mb-0 text-xs  md:text-l'><img src='/icons/ticket.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' /> {event.optionalCoverFee ? event.optionalCoverFee + ' SEK' : 'free to attend'}
                                                    {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                                            <Link className='underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase' href={event.optionalCallToActionUrl} target="_blank">{event.optionalCallToActionTitle}</Link>
                                                    )}
                                                </p>
                                                </div>
                                        </SmoothCollapse>
                                    </div>
                                )
                            } else if(index === 1) {
                                return (
                                <div key={index} className='text-gray-500'>
                                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.shortDate} {event.eventName}{expanded === index ? '' : '\u00A0>'}</h3>
                                    <SmoothCollapse expanded={expanded === index || desktop}>
                                        <p>{event.eventDescription}</p>
                                            <div className="pl-6 relative">
                                                <div className='ping'></div>
                                                <div className='ball -ml-12'></div><p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/date.png' className='inline align-text-mniddle md:align-text-middle' width='18' height='18' /> {event.longDate}</p>
                                                <p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/time.png' className='inline align-text-middle md:align-text-middle' width='18' height='18' /> {event.openingHours}</p>
                                                <address className='mb-0 text-xs md:text-l not-italic events'><img src='/icons/location.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' /> {event.venueName}
                                                    {eventAddress && (
                                                        <Link className='underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase' href={'https://maps.google.com/maps?q=' + eventAddress} target='_blank'>Get directions</Link>
                                                    )}
                                                </address>
                                                <p className='mb-0 text-xs  md:text-l'><img src='/icons/ticket.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' /> {event.optionalCoverFee ? event.optionalCoverFee + ' SEK' : 'free to attend'}
                                                    {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                                            <Link className='underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase' href={event.optionalCallToActionUrl} target="_blank">{event.optionalCallToActionTitle}</Link>
                                                    )}
                                                </p>
                                            </div>
                                    </SmoothCollapse>
                                </div>
                                )
                            } else {
                                return (
                                <div key={index} className='text-gray-500'>
                                    <h3 onClick={() => setExpanded(index)} className='cursor-pointer rainbow_text_animated'>{event.shortDate} {event.eventName}{expanded === index ? '' : '\u00A0>'}</h3>
                                    <SmoothCollapse expanded={expanded === index || desktop}>
                                        <p>{event.eventDescription}</p>
                                            <div className="pl-6 relative">
                                                <div className='ping'></div>
                                                <div className='ball -ml-12'></div><p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/date.png' className='inline align-text-mniddle md:align-text-middle' width='18' height='18' /> {event.longDate}</p>
                                                <p className='mb-0 text-xs md:text-l pb-1'><img src='/icons/time.png' className='inline align-text-middle md:align-text-middle' width='18' height='18' /> {event.openingHours}</p>
                                                <address className='mb-0 text-xs md:text-l not-italic events'><img src='/icons/location.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' /> {event.venueName}
                                                    {eventAddress && (
                                                        <Link className='underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase' href={'https://maps.google.com/maps?q=' + eventAddress} target='_blank'>Get directions</Link>
                                                    )}
                                                </address>
                                                <p className='mb-0 text-xs  md:text-l'><img src='/icons/ticket.png' className='inline align-text-middle md:align-text-middle pb-1' width='18' height='18' /> {event.optionalCoverFee ? event.optionalCoverFee + ' SEK' : 'free to attend'}
                                                    {event.optionalCallToActionTitle && event.optionalCallToActionUrl && (
                                                            <Link className='underline text-xs md:text-sm ml-4 align-middle smallbutton uppercase' href={event.optionalCallToActionUrl} target="_blank">{event.optionalCallToActionTitle}</Link>
                                                    )}
                                                </p>
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