"use client"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Crew() {

    return (
        <Tabs>
            <TabList>
            <Tab>DJs</Tab>
            <Tab>Crew</Tab>
            <Tab>The Board</Tab>
            <Tab>Alumni</Tab>
            </TabList>
        
            <TabPanel>
            <h2>Active crew members who also DJ</h2>
            <p>Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el</p>
            </TabPanel>
            <TabPanel>
            <h2>Active non-DJ crew members</h2>
            <p>Njursten, Toolsmonkey, Zaz</p>
            </TabPanel>
            <TabPanel>
                <h2>The current board of the non-profit organisation Ideella Spelmusikfrämjandet</h2>
                <p>Ventura (chairman), Weyland (treasurer), Matti, MissStabby, Fastbom</p>
            </TabPanel>
            <TabPanel>
                <h2>Inactive crew members</h2>
                <p>Jon, Matti, Lindroth, Wezz, Daniel, Nik, Whiting, Borchers, McFly, Windefalk, MrTimpi, Hakushi, Velo</p>
            </TabPanel>        
        </Tabs>
   )
}