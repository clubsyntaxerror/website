"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type FastextItem = { label: string; href: string; external?: boolean };

const FASTEXT_COLORS = ["red", "green", "yellow", "cyan"] as const;
const FASTEXT_KEYS = ["r", "g", "y", "b"];

type Ctx = {
    entry: string;
    status: string | null;
    press: (digit: string) => void;
    setEntry: (value: string) => void;
    fastext: FastextItem[];
    setFastext: (items: FastextItem[]) => void;
    activateFastext: (index: number) => void;
    directory: Record<number, string>;
};

const PageEntryContext = createContext<Ctx | null>(null);

function usePageEntry() {
    const ctx = useContext(PageEntryContext);
    if (!ctx) throw new Error("Teletext components must be inside <PageEntryProvider>");
    return ctx;
}

function prefersReducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Holds the typed page number, the current Fastext links and the keyboard shortcuts. */
export function PageEntryProvider({ directory, children }: { directory: Record<number, string>; children: ReactNode }) {
    const router = useRouter();
    const [entry, setEntryState] = useState("");
    const [status, setStatus] = useState<string | null>(null);
    const [fastext, setFastext] = useState<FastextItem[]>([]);
    const statusTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

    const go = useCallback(
        (value: string) => {
            setEntryState("");
            const href = directory[Number(value)];
            if (href) {
                setStatus(null);
                router.push(href);
            } else {
                setStatus(`PAGE ${value} NOT IN SERVICE - TRY 100`);
                clearTimeout(statusTimer.current);
                statusTimer.current = setTimeout(() => setStatus(null), 3000);
            }
        },
        [directory, router],
    );

    const setEntry = useCallback(
        (value: string) => {
            const digits = value.replace(/\D/g, "").slice(0, 3);
            if (digits.length === 3) go(digits);
            else setEntryState(digits);
        },
        [go],
    );

    const press = useCallback((digit: string) => setEntry(entry + digit), [entry, setEntry]);

    const activateFastext = useCallback(
        (index: number) => {
            const item = fastext[index];
            if (!item) return;
            if (item.external) window.open(item.href, "_blank", "noopener");
            else router.push(item.href);
        },
        [fastext, router],
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            const target = e.target as HTMLElement | null;
            if (target?.closest("input, textarea, select, [contenteditable=true]")) return;
            if (/^\d$/.test(e.key)) {
                e.preventDefault();
                press(e.key);
            } else if (e.key === "Escape") {
                setEntryState("");
            } else {
                const index = FASTEXT_KEYS.indexOf(e.key.toLowerCase());
                if (index >= 0) activateFastext(index);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [press, activateFastext]);

    const value = useMemo(
        () => ({ entry, status, press, setEntry, fastext, setFastext, activateFastext, directory }),
        [entry, status, press, setEntry, fastext, activateFastext, directory],
    );
    return <PageEntryContext.Provider value={value}>{children}</PageEntryContext.Provider>;
}

let lastShownPage: number | null = null;

function formatClock(d: Date) {
    const day = d.toLocaleString("en-GB", { weekday: "short" });
    const date = d.getDate().toString().padStart(2, "0");
    const month = d.toLocaleString("en-GB", { month: "short" }).slice(0, 3);
    const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    return `${day}${date} ${month} ${time.slice(0, 5)}/${time.slice(6, 8)}`;
}

/** The 40-character page header: P-number entry, service name, rolling page counter and clock. */
export function Header({ number }: { number: number }) {
    const { entry, setEntry, status, directory } = usePageEntry();
    const [shown, setShown] = useState(number);
    const [clock, setClock] = useState<string | null>(null);

    useEffect(() => {
        const tick = () => setClock(formatClock(new Date()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // Teletext "searching" effect: the counter rolls through other pages before landing.
    useEffect(() => {
        const from = lastShownPage;
        lastShownPage = number;
        if (from === null || from === number || prefersReducedMotion()) {
            setShown(number);
            return;
        }
        const pool = Object.keys(directory).map(Number);
        let step = 0;
        const id = setInterval(() => {
            step++;
            if (step >= 7) {
                setShown(number);
                clearInterval(id);
            } else {
                setShown(pool[Math.floor(Math.random() * pool.length)] ?? 100 + step);
            }
        }, 45);
        return () => clearInterval(id);
    }, [number, directory]);

    return (
        <header className="tt-header">
            <label className="tt-pno">
                <span aria-hidden="true">P</span>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={3}
                    autoComplete="off"
                    aria-label={`Page ${number}. Type a page number to go there`}
                    placeholder={String(number)}
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && setEntry("")}
                />
            </label>
            <span className="tt-service fg-yellow"> SYNTAX ERROR </span>
            <span className="tt-counter" aria-hidden="true">
                {String(shown).padStart(3, "0")}
            </span>
            <span className="tt-clock fg-yellow" aria-hidden="true" suppressHydrationWarning>
                {" "}
                {clock ?? "".padEnd(18)}
            </span>
            {status && (
                <p className="tt-status" role="status">
                    {status}
                </p>
            )}
        </header>
    );
}

/** The four coloured shortcut links along the bottom. Keys R G Y B work too. */
export function Fastext({ items }: { items: FastextItem[] }) {
    const { setFastext } = usePageEntry();
    const key = JSON.stringify(items);
    useEffect(() => {
        setFastext(JSON.parse(key));
    }, [key, setFastext]);

    return (
        <nav className="tt-fastext" aria-label="Quick links">
            {items.slice(0, 4).map((item, i) => (
                <Link
                    key={i}
                    href={item.href}
                    className={`tt-fast fg-${FASTEXT_COLORS[i]}`}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    aria-keyshortcuts={FASTEXT_KEYS[i]}
                >
                    <span className="tt-fast-i">{item.label}</span>
                </Link>
            ))}
        </nav>
    );
}

/** Desktop-only remote control. */
export function Remote() {
    const { press, activateFastext, entry } = usePageEntry();
    const router = useRouter();
    const scroll = (dy: number) =>
        document
            .getElementById("tt-screen")
            ?.scrollBy({ top: dy, behavior: prefersReducedMotion() ? "auto" : "smooth" });

    return (
        <aside className="tt-remote" aria-label="Remote control">
            <div className="tt-remote-led" aria-hidden="true">
                {entry ? `P${entry.padEnd(3, "-")}` : "TEXT"}
            </div>
            <div className="tt-remote-digits">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
                    <button key={d} type="button" onClick={() => press(d)} aria-label={`Digit ${d}`}>
                        {d}
                    </button>
                ))}
                <button type="button" onClick={() => router.push("/")} aria-label="Index page 100">
                    i
                </button>
                <button type="button" onClick={() => press("0")} aria-label="Digit 0">
                    0
                </button>
                <button type="button" onClick={() => scroll(-240)} aria-label="Scroll up">
                    ▲
                </button>
            </div>
            <div className="tt-remote-colors">
                {FASTEXT_COLORS.map((color, i) => (
                    <button
                        key={color}
                        type="button"
                        className={`bg-${color}`}
                        onClick={() => activateFastext(i)}
                        aria-label={`${color} Fastext button`}
                    />
                ))}
            </div>
            <button type="button" className="tt-remote-wide" onClick={() => scroll(240)} aria-label="Scroll down">
                ▼
            </button>
            <p className="tt-remote-help">
                Type 3 digits
                <br />R G Y B keys
            </p>
        </aside>
    );
}

/** Live countdown to the next party. */
export function Countdown({ start, end }: { start: string; end: string }) {
    const [now, setNow] = useState<number | null>(null);
    useEffect(() => {
        setNow(Date.now());
        const id = setInterval(() => setNow(Date.now()), 30_000);
        return () => clearInterval(id);
    }, []);
    if (now === null) return <span>&nbsp;</span>;
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    if (now >= s && now < e) return <span className="tt-flash fg-green">*** HAPPENING RIGHT NOW ***</span>;
    if (now >= e) return <span className="fg-white">SEE YOU NEXT TIME</span>;
    const mins = Math.floor((s - now) / 60_000);
    const d = Math.floor(mins / 1440);
    const h = Math.floor((mins % 1440) / 60);
    const m = mins % 60;
    return (
        <span>
            STARTS IN <span className="fg-white">{d}</span>D <span className="fg-white">{h}</span>H{" "}
            <span className="fg-white">{m}</span>M
        </span>
    );
}

/** Rotating guest quotes, like a news ticker page. */
export function Ticker({ items }: { items: string[] }) {
    const [i, setI] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setI((n) => (n + 1) % items.length), 6000);
        return () => clearInterval(id);
    }, [items.length]);
    return (
        <p className="tt-ticker" aria-live="off">
            {items[i]}
        </p>
    );
}
