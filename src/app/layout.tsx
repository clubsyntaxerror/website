import "./globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import Nav from "../components/nav";

const microKnight = localFont({ src: "../fonts/microknight.woff2", variable: "--font-microknight", display: "swap" });

export const metadata = {
    metadataBase: new URL("https://www.syntax-error.se"),
    title: "Club Syntax Error - Stockholm's Video Game Nightclub",
    description:
        "Dance the night away to video game music and play brand-new or retro video games – all in our uniquely warm and accepting atmosphere.",
    alternates: {
        canonical: "https://www.syntax-error.se",
    },
    openGraph: {
        siteName: "Club Syntax Error",
        title: "Club Syntax Error - Stockholm's Video Game Nightclub",
        description:
            "Dance the night away to video game music and play brand-new or retro video games – all in our uniquely warm and accepting atmosphere.",
        url: "https://www.syntax-error.se",
        images: [
            {
                url: "https://www.syntax-error.se/video-poster.jpg",
                width: 1920,
                height: 1080,
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={microKnight.className}>
                <Nav />
                {children}
                <Analytics />
                <script
                    async
                    src="https://eocampaign1.com/form/2b5e1218-c793-11ef-a7c8-9d7832b0d31b.js"
                    data-form="2b5e1218-c793-11ef-a7c8-9d7832b0d31b"
                ></script>
            </body>
        </html>
    );
}
