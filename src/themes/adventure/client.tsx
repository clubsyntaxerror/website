"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type FormEvent,
    type KeyboardEvent as ReactKeyboardEvent,
    type ReactNode,
} from "react";
import {
    QUEST_PREFIX,
    ROOMS,
    YEAR_FOUNDED,
    exitsOf,
    roomForPath,
    roomHref,
    type Direction,
    type RoomId,
} from "./rooms";

export type QuestSummary = {
    number: number;
    name: string;
    href: string;
    slug: string;
    date: string;
    ticket?: string;
    start: string;
    end: string;
    price: string;
};

export type World = { quests: QuestSummary[]; nextSlug?: string; danceHref: string };

type LogEntry = { id: number; command?: string; lines: string[] };

type Outcome = {
    lines: string[];
    href?: string;
    external?: string;
    back?: boolean;
    clear?: boolean;
    scrollTo?: string;
};

type Ctx = {
    world: World;
    room: RoomId;
    log: LogEntry[];
    run: (command: string) => void;
    clear: () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
};

const AdventureContext = createContext<Ctx | null>(null);

function useAdventure() {
    const ctx = useContext(AdventureContext);
    if (!ctx) throw new Error("Adventure components must be inside <AdventureProvider>");
    return ctx;
}

function prefersReducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const DIRECTIONS: Record<string, Direction> = {
    n: "north",
    north: "north",
    up: "north",
    s: "south",
    south: "south",
    down: "south",
    e: "east",
    east: "east",
    right: "east",
    w: "west",
    west: "west",
    left: "west",
};

const HELP = [
    "COMMANDS:",
    "N S E W      walk that way",
    "GO <ROOM>    e.g. GO ORACLE",
    "QUESTS       list the parties",
    "READ <N>     read quest N",
    "TICKET       buy a ticket",
    "ASK <WORDS>  ask the oracle (FAQ)",
    "LOOK  MAP  EXITS  INVENTORY",
];

function findRoom(words: string): RoomId | undefined {
    const ids = Object.keys(ROOMS) as RoomId[];
    const exact = ids.find((id) => ROOMS[id].aliases.includes(words));
    if (exact || words.length < 3) return exact;
    return ids.find((id) => ROOMS[id].aliases.some((alias) => alias.startsWith(words)));
}

const dirName = (d: Direction) => d.toUpperCase();

/** The parser. Pure: decides what a command does, the provider carries it out. */
export function interpret(raw: string, room: RoomId, world: World, pathname: string): Outcome {
    const text = raw
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ")
        .replace(/[.!?]+$/, "");
    if (!text) return { lines: [] };
    const [verb, ...rest] = text.split(" ");
    const arg = rest.join(" ").replace(/^(to the|to|the|at|into|a) /, "");

    const goTo = (id: RoomId, how: string): Outcome => {
        const href = roomHref(id, world.danceHref);
        if (href === pathname) return { lines: [`You are already in ${ROOMS[id].name}.`] };
        return { lines: [`${how} ${ROOMS[id].name}.`], href };
    };

    const walk = (direction: Direction): Outcome => {
        const exit = exitsOf(room).find((e) => e.direction === direction);
        if (!exit) return { lines: ["You can't go that way."] };
        return goTo(exit.room, `You walk ${direction} to`);
    };

    const questByNumber = (n: number): Outcome => {
        const quest = world.quests.find((q) => q.number === n);
        if (!quest) return { lines: [`There is no quest ${n} on the board.`] };
        return { lines: [`You unroll scroll ${n}: ${quest.name}.`], href: quest.href };
    };

    const listQuests = (): string[] =>
        world.quests.length
            ? world.quests.map((q) => `${q.number}. ${q.date} ${q.name}`)
            : ["The quest board is empty. Ask the ravens to tell you when new quests appear."];

    if (/^\d+$/.test(text)) return questByNumber(Number(text));

    switch (verb) {
        case "help":
        case "h":
        case "?":
        case "commands":
            return { lines: HELP };
        case "look":
        case "l":
            return { lines: [ROOMS[room].name.toUpperCase(), ROOMS[room].description], scrollTo: "adv-top" };
        case "map":
        case "m":
            return { lines: ["You unfold your map."], scrollTo: "adv-map" };
        case "exits":
        case "x":
            return {
                lines: exitsOf(room).map((e) => `${dirName(e.direction)}: ${ROOMS[e.room].name}`),
            };
        case "i":
        case "inv":
        case "inventory":
            return {
                lines: [
                    "You are carrying:",
                    "  a glow stick",
                    "  3 tokens for the arcade",
                    "  an unshakeable love of chiptune",
                ],
            };
        case "quests":
        case "q":
        case "list":
            return {
                lines: listQuests(),
                href: pathname === ROOMS.quests.href ? undefined : ROOMS.quests.href,
            };
        case "read":
        case "quest":
        case "open":
        case "scroll":
            if (/^\d+$/.test(arg)) return questByNumber(Number(arg));
            return { lines: ["Read which quest? Try READ 1.", ...listQuests()] };
        case "ticket":
        case "tickets":
        case "buy":
        case "take":
        case "book": {
            const slug = pathname.startsWith(QUEST_PREFIX) ? pathname.slice(QUEST_PREFIX.length) : world.nextSlug;
            const quest = world.quests.find((q) => q.slug === slug);
            if (!quest) return { lines: ["There is no quest to take right now."] };
            if (!quest.ticket)
                return { lines: [`${quest.name}: no tickets needed.`, `Entry: ${quest.price}. Just show up!`] };
            return {
                lines: [`A merchant opens a portal to the ticket shop for ${quest.name}.`],
                external: quest.ticket,
            };
        }
        case "ask":
            if (!arg) return { lines: ["Ask what? Try ASK AGE LIMIT."] };
            return {
                lines: ["The oracle closes her eyes and ponders..."],
                href: `${ROOMS.oracle.href}?ask=${encodeURIComponent(arg)}`,
            };
        case "go":
        case "walk":
        case "enter":
        case "visit":
        case "move":
        case "run":
        case "climb": {
            if (!arg) {
                if (verb === "run") return { lines: ["READY."] };
                return { lines: [`${verb[0].toUpperCase() + verb.slice(1)} where? Try GO NORTH.`] };
            }
            if (DIRECTIONS[arg]) return walk(DIRECTIONS[arg]);
            const id = findRoom(arg);
            if (id) return goTo(id, "You make your way to");
            return { lines: ["You can't find that place."] };
        }
        case "back":
        case "return":
        case "retreat":
            return { lines: ["You retrace your steps."], back: true };
        case "clear":
        case "cls":
            return { lines: [], clear: true };
        case "load":
            return { lines: ["SEARCHING FOR *", "LOADING", "READY."] };
        case "xyzzy":
        case "plugh":
            return { lines: ['A hollow voice says "Fool."'] };
        case "hello":
        case "hi":
        case "hey":
            return { lines: ["A crew member waves back."] };
        case "kill":
        case "attack":
        case "fight":
        case "hit":
            return { lines: ["Violence is against the Code.", "The guard is watching you."] };
        case "drink":
        case "beer":
            return { lines: ["The bar is by the dance floor. Drink responsibly, adventurer."] };
        case "sudo":
            return { lines: ["Nice try."] };
    }

    if (DIRECTIONS[text]) return walk(DIRECTIONS[text]);
    // "oracle please", "dance floor now": a room name first counts too.
    const id = findRoom(text) ?? findRoom(verb);
    if (id) return goTo(id, "You make your way to");
    return { lines: ["?SYNTAX  ERROR", "READY."] };
}

/** Holds the command log across page changes and runs commands. */
export function AdventureProvider({ world, children }: { world: World; children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const room = roomForPath(pathname, world.nextSlug);
    const [log, setLog] = useState<LogEntry[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const nextId = useRef(1);

    const clear = useCallback(() => setLog([]), []);

    const run = useCallback(
        (command: string) => {
            const outcome = interpret(command, room, world, pathname);
            if (outcome.clear) {
                setLog([]);
                return;
            }
            setLog((entries) => [...entries.slice(-3), { id: nextId.current++, command, lines: outcome.lines }]);
            if (outcome.external) window.open(outcome.external, "_blank", "noopener");
            if (outcome.back) router.back();
            else if (outcome.href) router.push(outcome.href);
            if (outcome.scrollTo)
                document
                    .getElementById(outcome.scrollTo)
                    ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
        },
        [room, world, pathname, router],
    );

    // Typing first: on a keyboard, any letter typed anywhere goes to the prompt.
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1 || e.key === " ") return;
            const target = e.target as HTMLElement | null;
            if (target?.closest("input, textarea, select, [contenteditable=true]")) return;
            inputRef.current?.focus();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const value = useMemo(() => ({ world, room, log, run, clear, inputRef }), [world, room, log, run, clear]);
    return <AdventureContext.Provider value={value}>{children}</AdventureContext.Provider>;
}

/** The command line pinned to the bottom of the screen, with the status bar and tappable shortcuts. */
export function Console() {
    const { world, room, log, run, clear, inputRef } = useAdventure();
    const pathname = usePathname();
    const [value, setValue] = useState("");
    const history = useRef<string[]>([]);
    const historyIndex = useRef(-1);
    const logRef = useRef<HTMLDivElement | null>(null);

    // On desktop the prompt is always ready; on phones we don't pop the keyboard unasked.
    useEffect(() => {
        if (window.matchMedia("(pointer: fine)").matches && document.activeElement === document.body)
            inputRef.current?.focus({ preventScroll: true });
    }, [pathname, inputRef]);

    useEffect(() => {
        logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
    }, [log]);

    const submit = (command: string) => {
        if (!command.trim()) return;
        history.current = [command, ...history.current.filter((c) => c !== command)].slice(0, 20);
        historyIndex.current = -1;
        run(command);
        setValue("");
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        submit(value);
    };

    const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault();
            const step = e.key === "ArrowUp" ? 1 : -1;
            const index = Math.max(-1, Math.min(history.current.length - 1, historyIndex.current + step));
            historyIndex.current = index;
            setValue(index >= 0 ? history.current[index] : "");
        } else if (e.key === "Escape") {
            setValue("");
            clear();
        }
    };

    const next = world.quests.find((q) => q.slug === world.nextSlug);
    const onQuest = pathname.startsWith(QUEST_PREFIX);
    const chips = [
        ...exitsOf(room).map((e) => ({
            label: `${e.direction[0].toUpperCase()}:${ROOMS[e.room].label}`,
            cmd: e.direction,
        })),
        ...((onQuest || next?.ticket) && next ? [{ label: "TICKET", cmd: "ticket" }] : []),
        { label: "LOOK", cmd: "look" },
        { label: "HELP", cmd: "help" },
    ];

    return (
        <div className="adv-console">
            <Status />
            {log.length > 0 && (
                <div className="adv-log" ref={logRef} aria-live="polite">
                    {log.map((entry) => (
                        <div key={entry.id}>
                            {entry.command && <p className="fg-lightBlue">&gt;{entry.command.toUpperCase()}</p>}
                            {entry.lines.map((line, i) => (
                                <p key={i} className={line.startsWith("?SYNTAX") ? "fg-lightRed" : undefined}>
                                    {line}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            <form className="adv-prompt" onSubmit={onSubmit} role="search" aria-label="Command line">
                <span aria-hidden="true">&gt;</span>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    aria-label="Type a command, for example HELP, GO NORTH or TICKET"
                    placeholder="WHAT NOW?"
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    enterKeyHint="go"
                />
            </form>
            <div className="adv-chips">
                {chips.map((chip) => (
                    <button key={chip.label} type="button" onClick={() => submit(chip.cmd)}>
                        {chip.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function useNow(interval: number) {
    const [now, setNow] = useState<number | null>(null);
    useEffect(() => {
        setNow(Date.now());
        const id = setInterval(() => setNow(Date.now()), interval);
        return () => clearInterval(id);
    }, [interval]);
    return now;
}

function until(now: number, start: string) {
    const mins = Math.max(0, Math.floor((new Date(start).getTime() - now) / 60_000));
    return { d: Math.floor(mins / 1440), h: Math.floor((mins % 1440) / 60), m: mins % 60 };
}

/** Rogue-style status line: level = years running, gold = entry fee, and time to the next quest. */
function Status() {
    const { world } = useAdventure();
    const now = useNow(30_000);
    const next = world.quests.find((q) => q.slug === world.nextSlug);
    const level = new Date().getFullYear() - YEAR_FOUNDED;
    let quest = "NO QUESTS POSTED";
    if (next && now !== null) {
        if (now >= new Date(next.start).getTime()) quest = "QUEST IN PROGRESS!";
        else {
            const { d, h } = until(now, next.start);
            quest = `QUEST IN ${d}D ${h}H`;
        }
    }
    return (
        <p className="adv-status" aria-hidden="true">
            <span className="fg-yellow">
                LV:{level} $:{next ? next.price.replace(" GOLD", "") : "-"}
            </span>
            <span className="fg-lightGreen">{quest}</span>
        </p>
    );
}

/** Live countdown to a quest. */
export function Countdown({ start, end }: { start: string; end: string }) {
    const now = useNow(30_000);
    if (now === null) return <span>&nbsp;</span>;
    if (now >= new Date(start).getTime() && now < new Date(end).getTime())
        return <span className="adv-blink fg-lightGreen">*** QUEST IN PROGRESS ***</span>;
    if (now >= new Date(end).getTime()) return <span>THE QUEST IS OVER</span>;
    const { d, h, m } = until(now, start);
    return (
        <span>
            STARTS IN <span className="fg-white">{d}</span>D <span className="fg-white">{h}</span>H{" "}
            <span className="fg-white">{m}</span>M
        </span>
    );
}

/** Things overheard in the hall: guest quotes, one at a time. */
export function Rumours({ items }: { items: string[] }) {
    const [i, setI] = useState(0);
    useEffect(() => {
        if (prefersReducedMotion()) return;
        const id = setInterval(() => setI((n) => (n + 1) % items.length), 7000);
        return () => clearInterval(id);
    }, [items.length]);
    return (
        <p className="adv-rumour" aria-live="off">
            {items[i]}
        </p>
    );
}

const BOOT = [
    "",
    "    **** SYNTAX ERROR 64 BASIC V2 ****",
    "",
    " 64K RAM SYSTEM  38911 BASIC BYTES FREE",
    "",
    "READY.",
    'LOAD"DUNGEON",8,1',
    "",
    "SEARCHING FOR DUNGEON",
    "LOADING",
    "READY.",
    "RUN",
];

/** The C64 boot screen, once per visit. Any key or tap skips it. */
export function Boot() {
    const [shown, setShown] = useState<number | null>(null);

    useEffect(() => {
        let seen = false;
        try {
            seen = sessionStorage.getItem("adv-booted") === "1";
            sessionStorage.setItem("adv-booted", "1");
        } catch {}
        if (seen || prefersReducedMotion()) return;
        setShown(0);
        let n = 0;
        const id = setInterval(() => {
            n++;
            setShown(n > BOOT.length + 2 ? null : n);
            if (n > BOOT.length + 2) clearInterval(id);
        }, 140);
        const skip = () => {
            clearInterval(id);
            setShown(null);
        };
        window.addEventListener("keydown", skip, { once: true });
        window.addEventListener("pointerdown", skip, { once: true });
        return () => {
            clearInterval(id);
            window.removeEventListener("keydown", skip);
            window.removeEventListener("pointerdown", skip);
        };
    }, []);

    if (shown === null) return null;
    return (
        <div className="adv-boot" aria-hidden="true">
            {BOOT.slice(0, shown).map((line, i) => (
                <p key={i}>{line || " "}</p>
            ))}
            <span className="adv-cursor" />
        </div>
    );
}

const STOP_WORDS = new Set([
    "the",
    "and",
    "for",
    "can",
    "how",
    "what",
    "when",
    "where",
    "are",
    "you",
    "your",
    "there",
    "is",
    "do",
    "does",
    "i",
    "a",
    "an",
    "to",
    "of",
    "in",
    "on",
    "at",
    "it",
    "be",
    "my",
]);

/** Answers ASK <words>: opens the best matching FAQ scroll. */
export function OracleAnswer({ faqs }: { faqs: { question: string; answer: string }[] }) {
    const ask = useSearchParams().get("ask");
    const [reply, setReply] = useState<string | null>(null);

    useEffect(() => {
        if (!ask) return setReply(null);
        const words = ask
            .toLowerCase()
            .split(/[^\p{L}\d]+/u)
            .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
        let best = -1;
        let bestScore = 0;
        faqs.forEach((faq, i) => {
            const q = faq.question.toLowerCase();
            const a = faq.answer.toLowerCase();
            const score = words.reduce((s, w) => s + (q.includes(w) ? 3 : 0) + (a.includes(w) ? 1 : 0), 0);
            if (score > bestScore) [best, bestScore] = [i, score];
        });
        if (best < 0) {
            setReply(`The oracle shrugs at "${ask}". Read the scrolls below, or ask the crew.`);
            return;
        }
        setReply(`The oracle points to scroll ${best + 1}.`);
        const el = document.getElementById(`scroll-${best + 1}`) as HTMLDetailsElement | null;
        if (el) {
            el.open = true;
            el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        }
    }, [ask, faqs]);

    if (!reply) return null;
    return (
        <p className="adv-oracle fg-yellow" role="status">
            {reply}
        </p>
    );
}
