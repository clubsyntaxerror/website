"use client";

import { useState, useId } from "react";
import { useMediaQuery } from "./utils/hooks";
import Collapse from "./utils/Collapse";

function Category({ name, members }) {
    return (
        <article className="text-gray-500">
            <h3 className="font-bold">{name}</h3>
            <p>{members}</p>
        </article>
    );
}

function CrewCollapser({ children }) {
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
            <Category
                name="Crew"
                members="Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el, Njursten, Toolsmonkey, A3M1N, Fetish23"
            />
            <Category name="DJs" members="Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el" />
            <Category name="VJs" members="Weyland, Fastbom, MissStabby, Fetish23" />
            <Category name="Board" members="Ventura (chairman), Weyland (treasurer), MissStabby, Jor-el, Fastbom" />
            <Category
                name="Alumni"
                members="Jon, Matti, Lindroth, Wezz, Daniel, Nik, Whiting, Borchers, McFly, Windefalk, MrTimpi, Hakushi, Velo, Zaz"
            />
        </div>
    );

    return (
        <>
            <h2 className="text-center text-white mb-4">Our crew</h2>
            <img src="/photos/crew.jpg" className="mb-4" alt="Syntax Error crew" />
            <p className="text-gray-500">
                Syntax Error is run by the non-profit organization Svenska Spelmusikfrämjandet whose members organize
                all our events together with volunteers.
            </p>

            {desktop !== false ? inner : <CrewCollapser>{inner}</CrewCollapser>}
        </>
    );
}
