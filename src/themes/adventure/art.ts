import { COLORS, type ColorName } from "./palette";
import { GLYPH_HEIGHT, glyph, textWidth, wrapText } from "./pixelFont";

/**
 * PETSCII-style block graphics: a bitmap of square block pixels, 80 across (two per
 * character on a 40 column screen), each one of the sixteen C64 colours or empty.
 */
export const WIDTH = 80;

/** Pixel values: 0 is empty, otherwise the C64 colour index + 1. */
export const K = Object.fromEntries(COLORS.map((name, i) => [name, i + 1])) as Record<ColorName, number>;

export class Bitmap {
    readonly height: number;
    readonly pixels: Uint8Array;

    constructor(height: number) {
        this.height = height;
        this.pixels = new Uint8Array(WIDTH * height);
    }

    get(x: number, y: number) {
        if (x < 0 || y < 0 || x >= WIDTH || y >= this.height) return 0;
        return this.pixels[y * WIDTH + x];
    }

    set(x: number, y: number, value: number) {
        x = Math.round(x);
        y = Math.round(y);
        if (x < 0 || y < 0 || x >= WIDTH || y >= this.height) return;
        this.pixels[y * WIDTH + x] = value;
    }

    /** Fill only empty pixels. */
    paint(x: number, y: number, value: number) {
        if (!this.get(Math.round(x), Math.round(y))) this.set(x, y, value);
    }

    drawText(text: string, x: number, y: number, scale: number, colorAt: (y: number) => number) {
        for (const char of text) {
            const g = glyph(char);
            if (!g) continue;
            g.forEach((row, gy) =>
                row.forEach((on, gx) => {
                    if (!on) return;
                    for (let sy = 0; sy < scale; sy++)
                        for (let sx = 0; sx < scale; sx++) {
                            const py = y + gy * scale + sy;
                            this.set(x + gx * scale + sx, py, colorAt(py));
                        }
                }),
            );
            x += (g[0].length + 1) * scale;
        }
    }

    /** Draws centered text lines, each in a band of `lineHeight` px starting at y. */
    drawLines(lines: string[], y: number, scale: number, lineHeight: number, colorAt: (y: number) => number) {
        lines.forEach((line, i) => {
            const width = textWidth(line) * scale;
            const top = y + i * lineHeight + Math.floor((lineHeight - GLYPH_HEIGHT * scale) / 2);
            this.drawText(line, Math.floor((WIDTH - width) / 2), top, scale, colorAt);
        });
    }
}

export { textWidth, wrapText, GLYPH_HEIGHT };

/** Small deterministic PRNG so the same party always gets the same art. */
export function rng(seedText: string) {
    let h = 1779033703 ^ seedText.length;
    for (let i = 0; i < seedText.length; i++) {
        h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    let a = h >>> 0;
    return () => {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export type Run = { x: number; y: number; w: number; value: number };

/** Collapse a bitmap into horizontal runs of equal colour, for compact SVG output. */
export function toRuns(bitmap: Bitmap): Run[] {
    const runs: Run[] = [];
    for (let y = 0; y < bitmap.height; y++) {
        let x = 0;
        while (x < WIDTH) {
            const value = bitmap.get(x, y);
            if (!value) {
                x++;
                continue;
            }
            let w = 1;
            while (x + w < WIDTH && bitmap.get(x + w, y) === value) w++;
            runs.push({ x, y, w, value });
            x += w;
        }
    }
    return runs;
}
