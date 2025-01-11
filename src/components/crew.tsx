"use client";

import { useState, useId } from "react";
import { useMediaQuery } from "./utils/hooks";
import Collapse from "./utils/Collapse";
import { useTranslations } from "next-intl";

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
    const t = useTranslations("CrewCollapser");

    return (
        <>
            <button
                aria-expanded={expanded}
                aria-controls={id}
                onClick={() => setExpanded((e) => !e)}
                className="text-gray-500"
            >
                {expanded ? t("hideCrew") : t("showCrew")} <span aria-hidden={true}>{expanded ? "<" : ">"}</span>
            </button>
            <Collapse expanded={expanded} id={id}>
                <div className="mt-4">{children}</div>
            </Collapse>
        </>
    );
}

export default function Crew() {
    const desktop = useMediaQuery("(min-width: 1024px)");

    const t = useTranslations("Crew");

    const inner = (
        <div className={`grid ${desktop ? "grid-cols-6" : "grid-cols-1"} gap-x-2`}>
            <Category
                name={t("crew")}
                members="Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el, Njursten, Toolsmonkey, A3M1N, Fetish23"
            />
            <Category name={t("djs")} members="Ventura, Fastbom, Weyland, Kim, MissStabby, Jor-el" />
            <Category name={t("vjs")} members="Weyland, Fastbom, MissStabby, Fetish23" />
            <Category
                name={t("board")}
                members="Ventura (chairman), Weyland (treasurer), MissStabby, Jor-el, Fastbom"
            />
            <Category
                name={t("alumni")}
                members="Jon, Matti, Lindroth, Wezz, Daniel, Nik, Whiting, Borchers, McFly, Windefalk, MrTimpi, Hakushi, Velo, Zaz"
            />
            <Category name={t("website")} members="Weyland (treasurer), JustSomeDev" />
        </div>
    );

    return (
        <>
            <h2 className="text-center text-white mb-4">{t("ourCrew")}</h2>
            <img src="/photos/crew.jpg" className="mb-4" alt={t("alt")} />
            <p className="text-gray-500">{t("description")}</p>

            {desktop !== false ? inner : <CrewCollapser>{inner}</CrewCollapser>}
        </>
    );
}
