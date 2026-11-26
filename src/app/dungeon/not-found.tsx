import { Button } from "../../themes/adventure/ui";
import { ROOMS } from "../../themes/adventure/rooms";

export default function Lost() {
    return (
        <main className="adv-main">
            <h1 className="adv-title">
                <span>?SYNTAX ERROR</span>
            </h1>
            <p className="fg-white">You can&apos;t go that way. This passage leads nowhere.</p>
            <p className="fg-lightBlue">READY.</p>
            <Button href={ROOMS.entrance.href}>&gt; BACK TO THE ENTRANCE HALL</Button>
        </main>
    );
}
