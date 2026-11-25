import { MetadataRoute } from "next";
import { getConfiguredTheme } from "../themes/config";

export default function sitemap(): MetadataRoute.Sitemap {
    const themePages: MetadataRoute.Sitemap =
        getConfiguredTheme() === "teletext"
            ? ["parties", "links", "crew"].map((page) => ({
                  url: `https://www.syntax-error.se/${page}`,
                  lastModified: new Date(),
                  changeFrequency: page === "parties" ? "weekly" : "monthly",
                  priority: page === "parties" ? 0.9 : 0.5,
              }))
            : [];
    return [
        ...themePages,
        {
            url: "https://www.syntax-error.se",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: "https://www.syntax-error.se/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://www.syntax-error.se/faq",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: "https://www.syntax-error.se/newsletter",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: "https://www.syntax-error.se/rules",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },
        {
            url: "https://www.syntax-error.se/privacy-policy-crewapp",
            lastModified: new Date("2026-02-15"),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
