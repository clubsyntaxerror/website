import type { ColorName } from "./palette";

/**
 * The dungeon: every page of the site is a room on a 3x3 map, entered from the hall in
 * the middle. Plain data, safe to import from both server and client components.
 */

export type RoomId = "entrance" | "quests" | "oracle" | "guards" | "archive" | "guild" | "ravens" | "warp" | "dance";
export type Direction = "north" | "south" | "east" | "west";

export type Room = {
    name: string;
    /** Up to 8 characters, written on the map. */
    label: string;
    /** The dance floor leads to the next party, so its href is resolved at runtime. */
    href: string;
    /** Words that take you there: GO ORACLE, FAQ, ... */
    aliases: string[];
    wall: ColorName;
    /** Things lying on the floor, drawn on the map. */
    features: string;
    description: string;
};

export const ROOMS: Record<RoomId, Room> = {
    entrance: {
        name: "The Entrance Hall",
        label: "ENTRANCE",
        href: "/",
        aliases: ["entrance", "hall", "entrance hall", "home", "index", "start", "lobby", "main"],
        wall: "lightBlue",
        features: "",
        description:
            "You stand in the entrance hall of an old cellar beneath Hornsgatan. Chiptunes thump through the stone and the air smells of fog machine. Passages lead in every direction.",
    },
    quests: {
        name: "The Quest Board",
        label: "QUESTS",
        href: "/parties",
        aliases: ["quests", "quest board", "board", "parties", "calendar", "events", "dates", "schedule"],
        wall: "green",
        features: "????",
        description:
            "A wooden board is covered in nailed-up scrolls. Each one announces a party. Adventurers gather here to pick their next quest.",
    },
    oracle: {
        name: "The Oracle",
        label: "ORACLE",
        href: "/faq",
        aliases: ["oracle", "faq", "questions", "sage"],
        wall: "purple",
        features: "&",
        description:
            "An ancient oracle sits in a cloud of fog-machine smoke, sipping a soft drink. She has heard every question before. ASK her anything.",
    },
    guards: {
        name: "The Guard Post",
        label: "GUARDS",
        href: "/rules",
        aliases: ["guards", "guard", "guard post", "rules", "code", "code of conduct", "conduct", "bouncer"],
        wall: "red",
        features: "G",
        description:
            "A crew member in a red t-shirt keeps watch. Carved into the wall behind them is the Code that every adventurer must follow.",
    },
    archive: {
        name: "The Archives",
        label: "ARCHIVES",
        href: "/about",
        aliases: ["archives", "archive", "about", "history", "library", "lore", "chronicles"],
        wall: "orange",
        features: "==",
        description:
            "Dusty tomes line the shelves, chronicling the realm since 2002. A candle flickers over an open book.",
    },
    guild: {
        name: "The Guild Hall",
        label: "GUILD",
        href: "/crew",
        aliases: ["guild", "guild hall", "crew", "artists", "djs", "members", "heroes"],
        wall: "yellow",
        features: "hhh",
        description:
            "Banners hang from the rafters, one for every bard, illusionist and adventurer who keeps the realm running.",
    },
    ravens: {
        name: "The Raven Roost",
        label: "RAVENS",
        href: "/newsletter",
        aliases: ["ravens", "raven", "roost", "raven roost", "newsletter", "mail", "news", "subscribe"],
        wall: "grey",
        features: "vvv",
        description:
            "Ravens shuffle on their perches, waiting to carry word of new quests to every corner of the realm.",
    },
    warp: {
        name: "The Warp Zone",
        label: "WARP",
        href: "/links",
        aliases: ["warp", "warp zone", "links", "portals", "social", "socials", "discord", "youtube"],
        wall: "cyan",
        features: "^^",
        description:
            "Shimmering portals hum in the walls. Each one leads to another realm where the crew can be found.",
    },
    dance: {
        name: "The Dance Floor",
        label: "DANCE",
        href: "/parties",
        aliases: ["dance floor", "dance", "dancefloor", "floor", "next", "next party", "next quest", "party"],
        wall: "lightRed",
        features: "*:*",
        description: "Lasers sweep across a packed dance floor. This is where the next quest takes place.",
    },
};

/** The map, north at the top. */
export const GRID: RoomId[][] = [
    ["guild", "quests", "oracle"],
    ["archive", "entrance", "guards"],
    ["ravens", "dance", "warp"],
];

export const YEAR_FOUNDED = 2002;

export function positionOf(id: RoomId) {
    for (let row = 0; row < GRID.length; row++) {
        const col = GRID[row].indexOf(id);
        if (col >= 0) return { row, col };
    }
    throw new Error(`Room ${id} is not on the map`);
}

const STEPS: Record<Direction, [number, number]> = { north: [-1, 0], south: [1, 0], east: [0, 1], west: [0, -1] };

export function exitsOf(id: RoomId): { direction: Direction; room: RoomId }[] {
    const { row, col } = positionOf(id);
    return (Object.keys(STEPS) as Direction[]).flatMap((direction) => {
        const [dr, dc] = STEPS[direction];
        const room = GRID[row + dr]?.[col + dc];
        return room ? [{ direction, room }] : [];
    });
}

export function roomHref(id: RoomId, danceHref: string) {
    return id === "dance" ? danceHref : ROOMS[id].href;
}

/** Which room a public URL belongs to. Party pages are scrolls on the quest board, the next one is the dance floor. */
export function roomForPath(pathname: string, nextSlug?: string): RoomId {
    if (pathname.startsWith("/party/")) return pathname === `/party/${nextSlug}` ? "dance" : "quests";
    for (const id of Object.keys(ROOMS) as RoomId[]) if (id !== "dance" && ROOMS[id].href === pathname) return id;
    return "entrance";
}
