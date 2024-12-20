"use client"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Crew() {

    return (
        <Tabs>
            <TabList>
            <Tab>DJs</Tab>
            <Tab>VJs</Tab>
            <Tab>Organizers</Tab>
            <Tab>Board Members</Tab>
            <Tab>Alumni</Tab>
            </TabList>
        
            <TabPanel>
            <p>Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el</p>
            </TabPanel>
            <TabPanel>
            <p>Weyland, Fetish23</p>
            </TabPanel>            
            <TabPanel>
            <p>Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el, Njursten, Toolsmonkey, A3M1N, Fetish23</p>
            </TabPanel>
            <TabPanel>
                <p>Ventura (chairman), Weyland (treasurer), MissStabby, Jor-el, Fastbom</p>
            </TabPanel>
            <TabPanel>
                <p>Jon, Matti, Lindroth, Wezz, Daniel, Nik, Whiting, Borchers, McFly, Windefalk, MrTimpi, Hakushi, Velo, Zaz</p>
            </TabPanel>        
        </Tabs>
   )
}