/** A 5x7 bitmap font for big block-graphic headlines. "#" is a lit pixel. Unknown characters are skipped. */
const GLYPHS: Record<string, string> = {
    A: ".###.|#...#|#...#|#####|#...#|#...#|#...#",
    B: "####.|#...#|#...#|####.|#...#|#...#|####.",
    C: ".###.|#...#|#....|#....|#....|#...#|.###.",
    D: "####.|#...#|#...#|#...#|#...#|#...#|####.",
    E: "#####|#....|#....|####.|#....|#....|#####",
    F: "#####|#....|#....|####.|#....|#....|#....",
    G: ".###.|#...#|#....|#.###|#...#|#...#|.####",
    H: "#...#|#...#|#...#|#####|#...#|#...#|#...#",
    I: "###|.#.|.#.|.#.|.#.|.#.|###",
    J: "..###|...#.|...#.|...#.|...#.|#..#.|.##..",
    K: "#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#",
    L: "#....|#....|#....|#....|#....|#....|#####",
    M: "#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#",
    N: "#...#|#...#|##..#|#.#.#|#..##|#...#|#...#",
    O: ".###.|#...#|#...#|#...#|#...#|#...#|.###.",
    P: "####.|#...#|#...#|####.|#....|#....|#....",
    Q: ".###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#",
    R: "####.|#...#|#...#|####.|#.#..|#..#.|#...#",
    S: ".####|#....|#....|.###.|....#|....#|####.",
    T: "#####|..#..|..#..|..#..|..#..|..#..|..#..",
    U: "#...#|#...#|#...#|#...#|#...#|#...#|.###.",
    V: "#...#|#...#|#...#|#...#|#...#|.#.#.|..#..",
    W: "#...#|#...#|#...#|#.#.#|#.#.#|#.#.#|.#.#.",
    X: "#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#",
    Y: "#...#|#...#|#...#|.#.#.|..#..|..#..|..#..",
    Z: "#####|....#|...#.|..#..|.#...|#....|#####",
    "0": ".###.|#...#|#..##|#.#.#|##..#|#...#|.###.",
    "1": ".#.|##.|.#.|.#.|.#.|.#.|###",
    "2": ".###.|#...#|....#|...#.|..#..|.#...|#####",
    "3": "#####|...#.|..#..|...#.|....#|#...#|.###.",
    "4": "...#.|..##.|.#.#.|#..#.|#####|...#.|...#.",
    "5": "#####|#....|####.|....#|....#|#...#|.###.",
    "6": "..##.|.#...|#....|####.|#...#|#...#|.###.",
    "7": "#####|....#|...#.|..#..|.#...|.#...|.#...",
    "8": ".###.|#...#|#...#|.###.|#...#|#...#|.###.",
    "9": ".###.|#...#|#...#|.####|....#|...#.|.##..",
    " ": "...|...|...|...|...|...|...",
    "!": "#|#|#|#|#|.|#",
    "?": ".###.|#...#|....#|...#.|..#..|.....|..#..",
    ".": ".|.|.|.|.|.|#",
    ",": "..|..|..|..|..|.#|#.",
    ":": ".|.|#|.|#|.|.",
    "'": "#|#|.|.|.|.|.",
    "-": "....|....|....|####|....|....|....",
    "+": ".....|..#..|..#..|#####|..#..|..#..|.....",
    "/": "....#|....#|...#.|..#..|.#...|#....|#....",
    "&": ".##..|#..#.|#.#..|.#...|#.#.#|#..#.|.##.#",
    "#": ".#.#.|#####|.#.#.|.#.#.|.#.#.|#####|.#.#.",
};

const FOLD: Record<string, string> = { Å: "A", Ä: "A", Ö: "O", É: "E", Ü: "U", "–": "-", "—": "-" };

export const GLYPH_HEIGHT = 7;

export type Glyph = boolean[][];

const cache = new Map<string, Glyph>();

export function glyph(char: string): Glyph | undefined {
    const c = FOLD[char.toUpperCase()] ?? char.toUpperCase();
    if (cache.has(c)) return cache.get(c);
    const def = GLYPHS[c];
    if (!def) return undefined;
    const rows = def.split("|").map((row) => [...row].map((p) => p === "#"));
    cache.set(c, rows);
    return rows;
}

/** Pixel width of a line of text at scale 1, including 1px letter spacing. */
export function textWidth(text: string) {
    let width = 0;
    let count = 0;
    for (const char of text) {
        const g = glyph(char);
        if (!g) continue;
        width += g[0].length;
        count++;
    }
    return width + Math.max(0, count - 1);
}

/** Greedy word wrap into lines no wider than maxWidth pixels. Returns undefined if a word cannot fit. */
export function wrapText(text: string, maxWidth: number): string[] | undefined {
    const words = text.trim().split(/\s+/);
    const lines: string[] = [];
    let current = "";
    for (const word of words) {
        if (textWidth(word) > maxWidth) return undefined;
        const candidate = current ? `${current} ${word}` : word;
        if (textWidth(candidate) <= maxWidth) {
            current = candidate;
        } else {
            lines.push(current);
            current = word;
        }
    }
    if (current) lines.push(current);
    return lines;
}
