import { Press_Start_2P } from "next/font/google";

/** 8x8 pixel font, square cells like the C64 character set. */
export const adventureFont = Press_Start_2P({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-adventure",
    display: "swap",
});
