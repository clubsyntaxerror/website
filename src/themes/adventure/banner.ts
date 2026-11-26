import { Bitmap, GLYPH_HEIGHT, K, WIDTH, rng, textWidth, wrapText } from "./art";

/**
 * Generates a PETSCII-style banner for a party from data already in the events sheet.
 * Keywords in the name/description steer the art (adventure dungeons, Halloween drips,
 * Christmas snow, ...); otherwise the month picks the colours and the date picks the pattern.
 */

type Pattern = "dungeon" | "invaders" | "wave" | "stars" | "eq" | "drip" | "snow" | "stripes";

type Style = {
    pattern: Pattern;
    /** Title colours for the top, middle and bottom third of each text line. */
    text: [number, number, number];
    /** Colours used by the pattern. */
    accent: number[];
};

const STEERING: { match: RegExp; style: Partial<Style> }[] = [
    {
        match: /adventure|quest|dungeon|dragon|rpg|fantasy|zelda|sword|castle|knight|wizard/i,
        style: { pattern: "dungeon", text: [K.yellow, K.yellow, K.orange], accent: [K.orange] },
    },
    {
        match: /hallo+ween|spooky|horror|zombie|ghost|goth|blood|vampire/i,
        style: { pattern: "drip", text: [K.orange, K.orange, K.red], accent: [K.red] },
    },
    {
        match: /x-?mas|christmas|jul|winter|snow|lucia|new year|nyår/i,
        style: { pattern: "snow", text: [K.white, K.white, K.lightGrey], accent: [K.white, K.lightGrey] },
    },
    {
        match: /pride|rainbow|queer|lgbt/i,
        style: { pattern: "stripes", text: [K.white, K.white, K.lightGrey], accent: [] },
    },
    {
        match: /release|album|live|concert|gig|launch|chiptune|chip ?music/i,
        style: { pattern: "eq", text: [K.lightGreen, K.lightGreen, K.cyan], accent: [K.green] },
    },
    {
        match: /birthday|anniversary|jubilee|years|party ?time|celebrat/i,
        style: { pattern: "stars", text: [K.yellow, K.yellow, K.white], accent: [K.purple, K.cyan, K.yellow] },
    },
    {
        match: /arcade|invader|space|retro|8-?bit|16-?bit/i,
        style: { pattern: "invaders", text: [K.lightGreen, K.lightGreen, K.green], accent: [K.lightGreen, K.cyan] },
    },
];

const MONTHS: Pick<Style, "text" | "accent">[] = [
    { text: [K.white, K.white, K.cyan], accent: [K.cyan, K.lightGrey] },
    { text: [K.lightRed, K.lightRed, K.red], accent: [K.purple, K.lightRed] },
    { text: [K.lightGreen, K.lightGreen, K.green], accent: [K.green, K.yellow] },
    { text: [K.yellow, K.yellow, K.lightGreen], accent: [K.cyan, K.lightGreen] },
    { text: [K.lightGreen, K.lightGreen, K.cyan], accent: [K.yellow, K.green] },
    { text: [K.yellow, K.yellow, K.white], accent: [K.purple, K.cyan] },
    { text: [K.cyan, K.cyan, K.lightGreen], accent: [K.yellow, K.cyan] },
    { text: [K.yellow, K.yellow, K.orange], accent: [K.lightRed, K.yellow] },
    { text: [K.orange, K.orange, K.yellow], accent: [K.brown, K.orange] },
    { text: [K.yellow, K.yellow, K.orange], accent: [K.red, K.orange] },
    { text: [K.lightRed, K.lightRed, K.purple], accent: [K.cyan, K.purple] },
    { text: [K.white, K.white, K.cyan], accent: [K.red, K.green] },
];

const DEFAULT_PATTERNS: Pattern[] = ["dungeon", "invaders", "wave", "stars", "eq", "drip"];

export function styleFor(name: string, description: string, date: Date, seed: string): Style {
    const random = rng(seed);
    const month = MONTHS[isNaN(date.getTime()) ? 0 : date.getMonth()];
    const base: Style = { pattern: DEFAULT_PATTERNS[Math.floor(random() * DEFAULT_PATTERNS.length)], ...month };
    const haystack = `${name} ${description}`;
    const steer = STEERING.find((s) => s.match.test(name)) ?? STEERING.find((s) => s.match.test(haystack));
    return steer ? { ...base, ...steer.style } : base;
}

const TOP = 6; // px above the title
const LINE = 9; // px per title line
const BOTTOM = 9; // px below the title

/** Returns undefined when the title cannot be drawn in at most 3 lines of block letters. */
export function eventBanner(title: string, description: string, date: Date, seed: string): Bitmap | undefined {
    // The brand is already on every page; "Syntax Error - Halloween" makes a banner of just "Halloween".
    const art = title.replace(/^\s*syntax error\s*[-–—:|]\s*/i, "") || title;
    const lines = wrapText(art.toUpperCase(), WIDTH - 2);
    if (!lines || lines.length === 0 || lines.length > 3) return undefined;
    const style = styleFor(title, description, date, seed);
    const random = rng(seed + "art");
    const bitmap = new Bitmap(TOP + lines.length * LINE + BOTTOM);
    const textTop = TOP;
    const textBottom = TOP + lines.length * LINE;

    bitmap.drawLines(lines, textTop, 1, LINE, (y) => style.text[Math.floor(((y - textTop) % LINE) / 3)]);
    drawPattern(bitmap, style, random, textTop, textBottom);
    return bitmap;
}

function drawPattern(b: Bitmap, style: Style, random: () => number, textTop: number, textBottom: number) {
    const accent = (i: number) => (style.accent.length ? style.accent[i % style.accent.length] : K.white);
    const bottom = b.height;

    switch (style.pattern) {
        case "dungeon": {
            // Brick walls above and below the title, with a row of torches along the floor.
            const bricks = (top: number, height: number) => {
                for (let y = top; y < top + height; y++)
                    for (let x = 0; x < WIDTH; x++) {
                        const row = y - top;
                        const course = Math.floor(row / 3);
                        const mortar = row % 3 === 2 || (x + (course % 2) * 4) % 8 === 7;
                        b.paint(x, y, mortar ? K.darkGrey : random() < 0.12 ? accent(0) : K.brown);
                    }
            };
            bricks(0, textTop - 1);
            bricks(textBottom + 3, bottom - textBottom - 3);
            for (const x of [5, 25, 53, 73]) {
                b.set(x, textBottom + 3, K.grey);
                b.set(x + 1, textBottom + 3, K.grey);
                b.set(x, textBottom + 2, K.yellow);
                b.set(x + 1, textBottom + 2, K.yellow);
                b.set(x + (random() < 0.5 ? 0 : 1), textBottom + 1, K.orange);
                b.set(x + (random() < 0.5 ? 0 : 1), textBottom, K.red);
            }
            break;
        }
        case "stripes": {
            const top = [K.red, K.orange, K.yellow];
            const low = [K.green, K.lightBlue, K.purple];
            top.forEach((c, i) => fillRows(b, i * 2, 2, c));
            low.forEach((c, i) => fillRows(b, textBottom + i * 3, 3, c));
            break;
        }
        case "wave": {
            const phase = random() * Math.PI * 2;
            for (let x = 0; x < WIDTH; x++) {
                const s = Math.sin(x / 6 + phase);
                b.paint(x, 2.5 + s * 2, accent(0));
                b.paint(x, textBottom + 4 + s * 3, accent(1));
                b.paint(x, textBottom + 4 - s * 3, accent(0));
            }
            break;
        }
        case "stars": {
            for (let y = 0; y < bottom; y++) {
                if (y >= textTop && y < textBottom) continue;
                for (let x = 0; x < WIDTH; x++) if (random() < 0.07) b.paint(x, y, accent(Math.floor(random() * 3)));
            }
            break;
        }
        case "snow": {
            for (let y = 0; y < bottom - 1; y++)
                for (let x = 0; x < WIDTH; x++) {
                    const inText = y >= textTop && y < textBottom;
                    if (!inText && random() < 0.08) b.paint(x, y, accent(Math.floor(random() * 2)));
                }
            for (let x = 0; x < WIDTH; x++) b.set(x, bottom - 1, K.white);
            for (let x = 0; x < WIDTH; x++) if (random() < 0.5) b.set(x, bottom - 2, K.white);
            break;
        }
        case "eq": {
            for (let x = 0; x < WIDTH; x++) b.set(x, 4, accent(0));
            for (let x = 1; x < WIDTH - 1; x += 3) {
                const h = 1 + Math.floor(random() * (bottom - textBottom - 1));
                for (let i = 0; i < h; i++) {
                    const y = bottom - 1 - i;
                    const c = i < 3 ? K.green : i < 6 ? K.yellow : K.red;
                    b.set(x, y, c);
                    b.set(x + 1, y, c);
                }
            }
            break;
        }
        case "drip": {
            for (let x = 0; x < WIDTH; x++) {
                b.set(x, 3, accent(0));
                b.set(x, 4, accent(0));
                b.set(x, 5, accent(0));
                if (random() < 0.12) for (let y = 6, n = random() * 5; y < 6 + n; y++) b.paint(x, y, accent(0));
            }
            // Drips running off the bottom of the letters.
            for (let x = 0; x < WIDTH; x++) {
                let lowest = -1;
                for (let y = textBottom - 1; y >= textTop; y--)
                    if (b.get(x, y)) {
                        lowest = y;
                        break;
                    }
                if (lowest < textBottom - 3 || random() > 0.45) continue;
                const color = b.get(x, lowest);
                const length = 1 + Math.floor(random() * (bottom - lowest - 1));
                for (let y = lowest + 1; y <= lowest + length; y++) b.paint(x, y, color);
            }
            break;
        }
        case "invaders": {
            const sprite = ["..#.#..", ".#####.", "##.#.##", "#######", "#.#.#.#"];
            const count = 5;
            const spacing = WIDTH / count;
            for (let i = 0; i < count; i++) {
                const x0 = Math.round(i * spacing + (spacing - 7) / 2);
                const y0 = textBottom + 2 + (i % 2);
                sprite.forEach((row, sy) =>
                    [...row].forEach((p, sx) => p === "#" && b.set(x0 + sx, y0 + sy, accent(i))),
                );
            }
            for (let x = 0; x < WIDTH; x++) if (x % 4 !== 3) b.set(x, 1, accent(0));
            if (random() < 0.5) {
                const ufo = Math.floor(random() * (WIDTH - 8));
                [".####.", "#.##.#", ".####."].forEach((row, sy) =>
                    [...row].forEach((p, sx) => p === "#" && b.set(ufo + sx, 2 + sy, K.red)),
                );
            }
            break;
        }
    }
}

function fillRows(b: Bitmap, y: number, h: number, value: number) {
    for (let yy = y; yy < y + h; yy++) for (let x = 0; x < WIDTH; x++) b.paint(x, yy, value);
}

/** The big logo for the entrance: cracktro rainbow letters between two raster bars. */
export function logoBanner(): { bitmap: Bitmap; cursor: { x: number; y: number; w: number; h: number } } {
    const scale = 2;
    const lineHeight = GLYPH_HEIGHT * scale + 2;
    const top = 4;
    const b = new Bitmap(top + lineHeight * 2 + 4);
    const rainbow = [K.purple, K.lightRed, K.orange, K.yellow, K.lightGreen, K.cyan, K.lightBlue];
    b.drawLines(["SYNTAX", "ERROR"], top, scale, lineHeight, (y) => {
        const inLine = (y - top) % lineHeight;
        return rainbow[Math.min(rainbow.length - 1, Math.max(0, Math.floor((inLine - 1) / 2)))];
    });
    const bars = [K.blue, K.lightBlue, K.cyan, K.lightBlue, K.blue];
    for (let x = 0; x < WIDTH; x++) {
        b.set(x, 1, bars[(x >> 3) % bars.length]);
        b.set(x, b.height - 2, bars[((x >> 3) + 2) % bars.length]);
    }
    // A blinking block cursor after "ERROR", like the C64's READY prompt.
    const errorEnd = Math.floor((WIDTH + textWidth("ERROR") * scale) / 2);
    const glyphTop = top + lineHeight + 1;
    return { bitmap: b, cursor: { x: errorEnd + 2, y: glyphTop, w: 6, h: GLYPH_HEIGHT * scale } };
}
