import Link from "next/link";
import type { ReactNode } from "react";
import { Fastext, Header, type FastextItem } from "./client";
import { PAGES, getUpcomingEvents } from "./directory";
import { EMAIL } from "../../content/site";

export type Color = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";

type PageProps = {
    number: number;
    children: ReactNode;
    /** Up to four Fastext links (red, green, yellow, cyan). Defaults to the site-wide set. */
    fastext?: FastextItem[];
};

export async function defaultFastext(): Promise<FastextItem[]> {
    const [next] = await getUpcomingEvents();
    return [
        { label: "PARTIES", href: PAGES.parties.href },
        next ? { label: "TICKETS", href: next.href } : { label: "NEWS", href: PAGES.newsletter.href },
        { label: "FAQ", href: PAGES.faq.href },
        { label: "INDEX", href: PAGES.index.href },
    ];
}

/** One teletext page: header row, content, footer and the Fastext row. */
export async function TeletextPage({ number, children, fastext }: PageProps) {
    return (
        <>
            <Header number={number} />
            <main className="tt-main">{children}</main>
            <footer className="tt-footer">
                <Rule color="blue" />
                <p className="fg-white">SVENSKA SPELMUSIKFRÄMJANDET 2002-{new Date().getFullYear()}</p>
                <p>
                    <a className="tt-link" href={`mailto:${EMAIL}`}>
                        {EMAIL.toUpperCase()}
                    </a>
                    {"  "}
                    <a className="tt-link fg-white" href="/privacy-policy-crewapp">
                        CREWAPP PRIVACY
                    </a>
                </p>
            </footer>
            <Fastext items={fastext ?? (await defaultFastext())} />
        </>
    );
}

/** Double-height text, the classic teletext headline. */
export function DH({
    children,
    color = "white",
    bg,
    as: Tag = "div",
    center,
    className = "",
}: {
    children: ReactNode;
    color?: Color;
    bg?: Color;
    as?: "div" | "h1" | "h2" | "h3" | "p";
    center?: boolean;
    className?: string;
}) {
    return (
        <Tag className={`tt-dh ${bg ? `bg-${bg}` : ""} ${className}`}>
            <span className={`tt-dh-i fg-${color} ${center ? "tt-center" : ""}`}>{children}</span>
        </Tag>
    );
}

/** A full-width coloured bar with a title in it. */
export function TitleBar({
    children,
    bg = "blue",
    color = "yellow",
}: {
    children: ReactNode;
    bg?: Color;
    color?: Color;
}) {
    return (
        <DH as="h1" bg={bg} color={color}>
            {" "}
            {children}
        </DH>
    );
}

export function Gap({ rows = 1 }: { rows?: number }) {
    return <div className="tt-gap" style={{ height: `calc(${rows} * var(--lh))` }} aria-hidden="true" />;
}

/** A thin line of separated mosaic blocks. */
export function Rule({ color = "blue" }: { color?: Color }) {
    return <div className={`tt-rule fg-${color}`} aria-hidden="true" />;
}

/** Index row: label, dot leader, page number. The whole row is the link. */
export function Leader({
    href,
    label,
    page,
    color = "white",
    external,
    sub,
}: {
    href: string;
    label: string;
    page?: number | string;
    color?: Color;
    external?: boolean;
    sub?: ReactNode;
}) {
    return (
        <Link
            href={href}
            className={`tt-leader fg-${color}`}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
        >
            <span className="tt-leader-row">
                <span className="tt-leader-label">{label}</span>
                <span className="tt-leader-dots fg-blue" aria-hidden="true">
                    {".".repeat(40)}
                </span>
                {page !== undefined && <span className="tt-leader-page fg-yellow">{page}</span>}
            </span>
            {sub && <span className="tt-leader-sub">{sub}</span>}
        </Link>
    );
}

export function Button({
    href,
    children,
    bg = "green",
    color = "black",
    external,
    big,
}: {
    href: string;
    children: ReactNode;
    bg?: Color;
    color?: Color;
    external?: boolean;
    big?: boolean;
}) {
    return (
        <a
            href={href}
            className={`tt-btn ${big ? "tt-btn-big" : ""} bg-${bg} fg-${color}`}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
        >
            <span className="tt-btn-i">{children}</span>
        </a>
    );
}

/** Turns e-mail addresses and the Discord link inside plain copy into links. */
export function RichText({ text }: { text: string }) {
    const parts = text.split(/(\b[\w.+-]+@[\w-]+\.[\w.]+\b)/g);
    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1 ? (
                    <a key={i} className="tt-link" href={`mailto:${part}`}>
                        {part}
                    </a>
                ) : (
                    part
                ),
            )}
        </>
    );
}
