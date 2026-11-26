import Link from "next/link";
import type { ReactNode } from "react";
import DungeonMap from "./DungeonMap";
import { ROOMS, exitsOf, roomHref, type RoomId } from "./rooms";
import { getWorld } from "./world";
import type { ColorName } from "./palette";
import { EMAIL } from "../../content/site";

type RoomProps = {
    id: RoomId;
    /** Replaces the room name in the title bar, e.g. the party name on a quest page. */
    title?: string;
    /** Shown above the title bar, e.g. the logo. When given, it holds the page's h1. */
    before?: ReactNode;
    /** Skip the room description (quest pages have their own). */
    describe?: boolean;
    children?: ReactNode;
};

/** One page = one room: title bar, map, description, content, exits and footer. */
export async function Room({ id, title, before, describe = true, children }: RoomProps) {
    const world = await getWorld();
    const room = ROOMS[id];
    const Heading = before ? "h2" : "h1";
    return (
        <>
            <div id="adv-top" />
            {before}
            <Heading className="adv-title">
                <span>{(title ?? room.name).toUpperCase()}</span>
            </Heading>
            <DungeonMap current={id} danceHref={world.danceHref} />
            {describe && <p className="adv-desc">{room.description}</p>}
            <main className="adv-main">{children}</main>
            <nav className="adv-exits" aria-label="Exits">
                <h2 className="fg-lightBlue">EXITS</h2>
                <ul>
                    {exitsOf(id).map((exit) => (
                        <li key={exit.direction}>
                            <Link href={roomHref(exit.room, world.danceHref)}>
                                <span className="fg-lightBlue">{exit.direction.toUpperCase().padEnd(6, " ")}</span>{" "}
                                {ROOMS[exit.room].name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <footer className="adv-footer">
                <p>SVENSKA SPELMUSIKFRÄMJANDET 2002-{new Date().getFullYear()}</p>
                <p>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href="/privacy-policy-crewapp">Crewapp privacy</a>
                </p>
            </footer>
        </>
    );
}

/** A section heading in reverse video, like PETSCII inverse characters. */
export function Heading({
    children,
    color = "yellow",
    as: Tag = "h2",
    id,
}: {
    children: ReactNode;
    color?: ColorName;
    as?: "h2" | "h3";
    id?: string;
}) {
    return (
        <Tag className={`adv-heading fg-${color}`} id={id}>
            {children}
        </Tag>
    );
}

/** A big reverse-video button. External links open in a new tab. */
export function Button({
    href,
    children,
    bg = "lightGreen",
    color = "black",
    external,
}: {
    href: string;
    children: ReactNode;
    bg?: ColorName;
    color?: ColorName;
    external?: boolean;
}) {
    const className = `adv-btn bg-${bg} fg-${color}`;
    if (external)
        return (
            <a href={href} className={className} target="_blank" rel="noopener noreferrer">
                {children}
            </a>
        );
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    );
}

/** Turns e-mail addresses inside plain copy into links. */
export function RichText({ text }: { text: string }) {
    const parts = text.split(/(\b[\w.+-]+@[\w-]+\.[\w.]+\b)/g);
    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1 ? (
                    <a key={i} href={`mailto:${part}`}>
                        {part}
                    </a>
                ) : (
                    part
                ),
            )}
        </>
    );
}

/** Quest facts as a key/value list: WHEN, WHERE, ... */
export function Facts({ items }: { items: [string, ReactNode][] }) {
    return (
        <dl className="adv-facts">
            {items.map(([key, value]) => (
                <div key={key}>
                    <dt className="fg-yellow">{key}</dt>
                    <dd>{value}</dd>
                </div>
            ))}
        </dl>
    );
}
