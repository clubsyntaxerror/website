"use client"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Crew() {

    return (
        <>
            <h2 className='text-center text-white mb-4'>Our crew</h2>
            <img src="/photos/crew.jpg" className='mb-4' />
            <p className='text-gray-500'>Syntax Error is run by the non-profit organization Svenska Spelmusikfrämjandet whose members organize all our events together with volunteers.</p>

            <Tabs className='text-gray-500 text-sm'>
                <TabList>
                <Tab>Crew</Tab>
                <Tab>DJs</Tab>
                <Tab>VJs</Tab>
                <Tab>Board</Tab>
                <Tab>Alumni</Tab>
                </TabList>
            
                <TabPanel>
                <p>Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el, Njursten, Toolsmonkey, A3M1N, Fetish23</p>
                </TabPanel>
                <TabPanel>
                <p>Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el</p>
                </TabPanel>
                <TabPanel>
                <p>Weyland, Fastbom, MissStabby, Fetish23</p>
                </TabPanel>            

                <TabPanel>
                    <p>Ventura (chairman), Weyland (treasurer), MissStabby, Jor-el, Fastbom</p>
                </TabPanel>
                <TabPanel>
                    <p>Jon, Matti, Lindroth, Wezz, Daniel, Nik, Whiting, Borchers, McFly, Windefalk, MrTimpi, Hakushi, Velo, Zaz</p>
                </TabPanel>        
            </Tabs>
        </>
   )
}