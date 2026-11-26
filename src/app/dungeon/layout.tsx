import "../../themes/adventure/adventure.css";
import { adventureFont } from "../../themes/adventure/font";
import { AdventureProvider, Console } from "../../themes/adventure/client";
import { getWorld } from "../../themes/adventure/world";

// The adventure theme, a C64 dungeon crawler, served under /dungeon next to the classic site.
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
