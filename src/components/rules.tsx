"use client";

import Link from "next/link";
import { useMediaQuery } from "./utils/hooks";
import { useTranslations } from "next-intl";

export default function Rules() {
    const desktop = useMediaQuery("(min-width: 1500px)");
    const t = useTranslations("Rules");

    return (
        <>
            <h2 className="text-white text-center mb-4">{t("ourRules")}</h2>
            <div className={`grid ${desktop ? "grid-cols-2" : "grid-cols-1"} gap-x-8`}>
                <div className="text-gray-500">
                    <h3>{t("beRespectful")}</h3>
                    <p>{t("beRespectfulDesc1")}</p>
                    <p>{t("beRespectfulDesc2")}</p>

                    <h3>{t("noHarassment")}</h3>
                    <p>{t("noHarassmentDesc")}</p>
                </div>
                <div className="text-gray-500">
                    <h3>{t("reachOutToOurCrew")}</h3>
                    <p>{t("reachOutToOurCrewDesc1")}</p>
                    <p>
                        {t("canEmailUs1")}{" "}
                        <Link href="mailto:info@syntax-error.se" className="smallbutton">
                            info@syntax-error.se
                        </Link>{" "}
                        {t("canEmailUs2")}
                    </p>
                    <p>{t("goAwayIfYouCantBeNice")}</p>
                    <p>{t("theHappyBit")}</p>
                </div>
            </div>
        </>
    );
}
