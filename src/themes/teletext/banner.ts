import { Bitmap, C, GLYPH_HEIGHT, SEP, WIDTH, rng, textWidth, wrapText } from "./mosaic";

/**
 * Generates a mosaic banner for a party from data already in the events sheet.
 * Keywords in the name/description steer the art (Halloween drips, Christmas snow, ...);
 * otherwise the month picks the colours and the date picks the pattern.
 */

type Pattern = "invaders" | "wave" | "stars" | "eq" | "drip" | "snow" | "stripes";

type Style = {
    pattern: Pattern;
    /** Title colour per cell row of each text line (3 rows). */
    text: [number, number, number];
    /** Colours used by the pattern. */
    accent: number[];
    separated: boolean;
};

const STEERING: { match: RegExp; style: Partial<Style> }[] = [
    {
        match: /hallo+ween|spooky|horror|zombie|ghost|goth|blood|vampire/i,
        style: { pattern: "drip", text: [C.Yellow, C.Yellow, C.Red], accent: [C.Red] },
    },
    {
        match: /x-?mas|christmas|jul|winter|snow|lucia|new year|nyår/i,
        style: { pattern: "snow", text: [C.White, C.White, C.Cyan], accent: [C.White, C.Cyan], separated: true },
    },
    {
        match: /pride|rainbow|queer|lgbt/i,
        style: { pattern: "stripes", text: [C.White, C.White, C.Yellow], accent: [] },
    },
    {
        match: /release|album|live|concert|gig|launch|chiptune|chip ?music/i,
        style: { pattern: "eq", text: [C.Magenta, C.Magenta, C.Cyan], accent: [C.Green, C.Yellow, C.Red] },
    },
    {
        match: /birthday|anniversary|jubilee|years|party ?time|celebrat/i,
        style: { pattern: "stars", text: [C.Yellow, C.Yellow, C.White], accent: [C.Magenta, C.Cyan, C.Yellow] },
    },
    {
        match: /arcade|invader|space|retro|8-?bit|16-?bit/i,
        style: { pattern: "invaders", text: [C.Green, C.Green, C.Cyan], accent: [C.Green, C.Cyan] },
    },
];

const MONTHS: Pick<Style, "text" | "accent">[] = [
    { text: [C.Cyan, C.Cyan, C.White], accent: [C.Blue, C.Cyan] },
    { text: [C.Magenta, C.Magenta, C.Red], accent: [C.Magenta, C.Red] },
    { text: [C.Green, C.Green, C.Yellow], accent: [C.Green, C.Yellow] },
    { text: [C.Yellow, C.Yellow, C.Green], accent: [C.Cyan, C.Green] },
    { text: [C.Green, C.Green, C.Cyan], accent: [C.Yellow, C.Green] },
    { text: [C.Yellow, C.Yellow, C.White], accent: [C.Magenta, C.Cyan] },
    { text: [C.Cyan, C.Cyan, C.Green], accent: [C.Yellow, C.Cyan] },
    { text: [C.Yellow, C.Yellow, C.Red], accent: [C.Magenta, C.Yellow] },
    { text: [C.Red, C.Red, C.Yellow], accent: [C.Green, C.Red] },
    { text: [C.Yellow, C.Yellow, C.Red], accent: [C.Red, C.Magenta] },
    { text: [C.Magenta, C.Magenta, C.Cyan], accent: [C.Cyan, C.Magenta] },
    { text: [C.White, C.White, C.Cyan], accent: [C.Red, C.Green] },
];

const DEFAULT_PATTERNS: Pattern[] = ["invaders", "wave", "stars", "eq", "drip"];

export function styleFor(name: string, description: string, date: Date, seed: string): Style {
    const random = rng(seed);
    const month = MONTHS[isNaN(date.getTime()) ? 0 : date.getMonth()];
    const base: Style = {
        pattern: DEFAULT_PATTERNS[Math.floor(random() * DEFAULT_PATTERNS.length)],
        ...month,
        separated: random() < 0.4,
    };
    const haystack = `${name} ${description}`;
    const steer = STEERING.find((s) => s.match.test(name)) ?? STEERING.find((s) => s.match.test(haystack));
    return steer ? { ...base, ...steer.style } : base;
}

const TOP = 6; // px: two cell rows above the title
const LINE = 9; // px: three cell rows per title line
const BOTTOM = 9; // px: three cell rows below the title

/** Returns undefined when the title cannot be drawn in at most 3 lines of mosaic letters. */
export function eventBanner(title: string, description: string, date: Date, seed: string): Bitmap | undefined {
    // The brand is already on every page; "Syntax Error - Halloween" makes a banner of just "Halloween".
    const art = title.replace(/^\s*syntax error\s*[-–—:|]\s*/i, "") || title;
    const lines = wrapText(art.toUpperCase(), WIDTH - 2);
    if (!lines || lines.length === 0 || lines.length > 3) return undefined;
    const style = styleFor(title, description, date, seed);
    const random = rng(seed + "art");
    const bitmap = new Bitmap((TOP + lines.length * LINE + BOTTOM) / 3);
    const textTop = TOP;
    const textBottom = TOP + lines.length * LINE;

    bitmap.drawLines(lines, textTop, 1, LINE, (y) => style.text[Math.floor(((y - textTop) % LINE) / 3)]);
    drawPattern(bitmap, style, random, textTop, textBottom);
    return bitmap;
}

function drawPattern(b: Bitmap, style: Style, random: () => number, textTop: number, textBottom: number) {
    const sep = style.separated ? SEP : 0;
    const accent = (i: number) => (style.accent.length ? style.accent[i % style.accent.length] : C.White) | sep;
    const bottom = b.height;

    switch (style.pattern) {
        case "stripes": {
            const top = [C.Red, C.Yellow];
            const low = [C.Green, C.Cyan, C.Magenta];
            top.forEach((c, i) => fillRows(b, i * 3, 3, c));
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
            for (let x = 0; x < WIDTH; x++) b.set(x, bottom - 1, C.White);
            for (let x = 0; x < WIDTH; x++) if (random() < 0.5) b.set(x, bottom - 2, C.White);
            break;
        }
        case "eq": {
            for (let x = 0; x < WIDTH; x++) b.set(x, 4, accent(0));
            for (let x = 1; x < WIDTH - 1; x += 3) {
                const h = 1 + Math.floor(random() * (bottom - textBottom - 1));
                for (let i = 0; i < h; i++) {
                    const y = bottom - 1 - i;
                    const c = i < 3 ? C.Green : i < 6 ? C.Yellow : C.Red;
                    b.set(x, y, c | sep);
                    b.set(x + 1, y, c | sep);
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
                    [...row].forEach((p, sx) => p === "#" && b.set(ufo + sx, 2 + sy, C.Red)),
                );
            }
            break;
        }
    }
}

function fillRows(b: Bitmap, y: number, h: number, value: number) {
    for (let yy = y; yy < y + h; yy++) for (let x = 0; x < WIDTH; x++) b.paint(x, yy, value);
}

/** The big rainbow logo for the index page: letters twice as wide, so they read square on tall sixels. */
export function logoBanner(): { bitmap: Bitmap; cursor: { x: number; y: number; w: number; h: number } } {
    const lineHeight = LINE;
    const top = 3;
    const b = new Bitmap((top + lineHeight * 2 + 3) / 3);
    const rainbow = [C.Magenta, C.Red, C.Yellow, C.Yellow, C.Green, C.Cyan];
    b.drawLines(["SYNTAX", "ERROR"], top, 2, lineHeight, (y) => rainbow[Math.floor((y - top) / 3)], 1);
    for (let x = 0; x < WIDTH; x++) {
        b.set(x, 1, C.Blue | SEP);
        b.set(x, b.height - 2, C.Blue | SEP);
    }
    // A blinking block cursor after "ERROR".
    const errorEnd = Math.floor((WIDTH + textWidth("ERROR") * 2) / 2);
    const glyphTop = top + lineHeight + Math.floor((lineHeight - GLYPH_HEIGHT) / 2);
    return { bitmap: b, cursor: { x: errorEnd + 2, y: glyphTop, w: 4, h: GLYPH_HEIGHT } };
}
