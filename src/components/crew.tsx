"use client";

import { useState, useId } from "react";
import Link from "next/link";
import { useMediaQuery } from "./utils/hooks";
import Collapse from "./utils/Collapse";
import { MERCH_URL, crew } from "../content/site";

function Category({ name, members }: { name: string; members: string }) {
    return (
        <article className="text-gray-500">
            <h3 className="font-bold">{name}</h3>
            <p>{members}</p>
        </article>
    );
}

function CrewCollapser({ children }: { children: React.ReactNode }) {
    const id = useId();
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <button
                aria-expanded={expanded}
                aria-controls={id}
                onClick={() => setExpanded((e) => !e)}
                className="text-gray-500"
            >
                {expanded ? "Hide" : "Show"} crew members <span aria-hidden={true}>{expanded ? "<" : ">"}</span>
            </button>
            <Collapse expanded={expanded} id={id}>
                <div className="mt-4">{children}</div>
            </Collapse>
        </>
    );
}

export default function Crew() {
    const desktop = useMediaQuery("(min-width: 1024px)");

    const inner = (
        <div className={`grid ${desktop ? "grid-cols-5" : "grid-cols-1"} gap-x-4`}>
            {crew.map((category) => (
                <Category key={category.name} name={category.name} members={category.members} />
            ))}
        </div>
    );

    return (
        <section className="p-6 w-full md:w-2/3">
            <h2 className="text-center text-white mb-4">Our crew</h2>
            <img src="/photos/crew.jpg" className="mb-4" alt="Syntax Error crew" />
            <p className="text-gray-500">
                Syntax Error is run by the non-profit organization Svenska Spelmusikfrämjandet whose members organize
                all our events together with volunteers.
            </p>

            {desktop !== false ? inner : <CrewCollapser>{inner}</CrewCollapser>}
            <div className="w-full text-center mt-4">
                <Link href={MERCH_URL} target="_blank" className="button bg-white text-black">
                    Get our merch
                </Link>
            </div>
        </section>
    );
}
