/** The sixteen C64 colours (the "Colodore" measurements), in the C64's own order. */
export const COLORS = [
    "black",
    "white",
    "red",
    "cyan",
    "purple",
    "green",
    "blue",
    "yellow",
    "orange",
    "brown",
    "lightRed",
    "darkGrey",
    "grey",
    "lightGreen",
    "lightBlue",
    "lightGrey",
] as const;

export type ColorName = (typeof COLORS)[number];

export const HEX: Record<ColorName, string> = {
    black: "#000000",
    white: "#ffffff",
    red: "#813338",
    cyan: "#75cec8",
    purple: "#8e3c97",
    green: "#56ac4d",
    blue: "#2e2c9b",
    yellow: "#edf171",
    orange: "#8e5029",
    brown: "#553800",
    lightRed: "#c46c71",
    darkGrey: "#4a4a4a",
    grey: "#7b7b7b",
    lightGreen: "#a9ff9f",
    lightBlue: "#706deb",
    lightGrey: "#b2b2b2",
};
