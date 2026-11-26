import "../../themes/adventure/adventure.css";
import { adventureFont } from "../../themes/adventure/font";
import { AdventureProvider, Console } from "../../themes/adventure/client";
import { getWorld } from "../../themes/adventure/world";

// Served on the public URLs by src/middleware.ts when the adventure theme is active.
export const revalidate = 3600;

export default async function AdventureLayout({ children }: { children: React.ReactNode }) {
    const world = await getWorld();
    return (
        <div className={`adv ${adventureFont.variable}`}>
            <AdventureProvider world={world}>
                <div className="adv-screen">
                    {children}
                    <Console />
                </div>
            </AdventureProvider>
        </div>
    );
}
