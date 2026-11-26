import Link from "next/link";
import { GRID, ROOMS, roomHref, type RoomId } from "./rooms";
import type { ColorName } from "./palette";

/**
 * The dungeon map, Rogue style: rooms with solid walls, # corridors, + doors and an @ for you.
 * 40 columns x 14 rows of characters; each room is a link.
 */

const COLS = 40;
const ROWS = 14;
const ROOM_W = 10;
const ROOM_H = 4;
const STEP_X = 15;
const STEP_Y = 5;

type Cell = { ch: string; fg?: ColorName; bg?: ColorName; you?: boolean };

function buildMap(current: RoomId) {
    const cells: Cell[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ({ ch: " " })));
    const put = (x: number, y: number, cell: Cell) => {
        if (y >= 0 && y < ROWS && x >= 0 && x < COLS) cells[y][x] = cell;
    };

    GRID.forEach((row, r) =>
        row.forEach((id, c) => {
            const room = ROOMS[id];
            const x0 = c * STEP_X;
            const y0 = r * STEP_Y;
            const here = id === current;
            for (let y = y0; y < y0 + ROOM_H; y++)
                for (let x = x0; x < x0 + ROOM_W; x++) {
                    const wall = y === y0 || y === y0 + ROOM_H - 1 || x === x0 || x === x0 + ROOM_W - 1;
                    // Dark floors; the room you're in is lit.
                    const floorCell: Cell = {
                        ch: y === y0 + 2 ? "." : " ",
                        fg: "grey",
                        bg: here ? "darkGrey" : "black",
                    };
                    put(x, y, wall ? { ch: " ", bg: room.wall } : floorCell);
                }
            const bg = here ? "darkGrey" : "black";
            const label = room.label.slice(0, ROOM_W - 2);
            const lx = x0 + 1 + Math.floor((ROOM_W - 2 - label.length) / 2);
            [...label].forEach((ch, i) => put(lx + i, y0 + 1, { ch, fg: here ? "white" : "lightGrey", bg }));
            const floor = y0 + 2;
            const features = room.features.slice(0, ROOM_W - 2);
            [...features].forEach((ch, i) =>
                put(x0 + 1 + i * 2 + (features.length < 3 ? 1 : 0), floor, { ch, fg: "yellow", bg }),
            );
            if (here) put(x0 + ROOM_W - 3, floor, { ch: "@", fg: "white", bg, you: true });

            // Corridors to the east and south neighbours, with doors in both walls.
            if (row[c + 1]) {
                put(x0 + ROOM_W - 1, floor, { ch: "+", fg: "yellow", bg: "brown" });
                for (let x = x0 + ROOM_W; x < x0 + STEP_X; x++) put(x, floor, { ch: "#", fg: "lightGrey" });
                put(x0 + STEP_X, floor, { ch: "+", fg: "yellow", bg: "brown" });
            }
            if (GRID[r + 1]?.[c]) {
                const cx = x0 + Math.floor(ROOM_W / 2) - 1;
                put(cx, y0 + ROOM_H - 1, { ch: "+", fg: "yellow", bg: "brown" });
                for (let y = y0 + ROOM_H; y < y0 + STEP_Y; y++) put(cx, y, { ch: "#", fg: "lightGrey" });
                put(cx, y0 + STEP_Y, { ch: "+", fg: "yellow", bg: "brown" });
            }
        }),
    );
    return cells;
}

export default function DungeonMap({ current, danceHref }: { current: RoomId; danceHref: string }) {
    const cells = buildMap(current);
    return (
        <nav className="adv-map" id="adv-map" aria-label="Dungeon map">
            <div aria-hidden="true">
                {cells.map((row, y) => (
                    <div key={y} className="adv-map-row">
                        {row.map((cell, x) => (
                            <span
                                key={x}
                                className={`${cell.fg ? `fg-${cell.fg}` : ""} ${cell.bg ? `bg-${cell.bg}` : ""} ${cell.you ? "adv-blink" : ""}`}
                            >
                                {cell.ch}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            {GRID.flatMap((row, r) =>
                row.map((id, c) => (
                    <Link
                        key={id}
                        href={roomHref(id, danceHref)}
                        className="adv-map-room"
                        aria-current={id === current ? "location" : undefined}
                        style={{
                            left: `${((c * STEP_X) / COLS) * 100}%`,
                            top: `${((r * STEP_Y) / ROWS) * 100}%`,
                            width: `${(ROOM_W / COLS) * 100}%`,
                            height: `${(ROOM_H / ROWS) * 100}%`,
                        }}
                    >
                        <span className="adv-sr">{ROOMS[id].name}</span>
                    </Link>
                )),
            )}
        </nav>
    );
}
