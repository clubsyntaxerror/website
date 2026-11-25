/**
 * Site themes.
 *
 * "classic" is the original site in src/app/page.tsx and src/app/(pages)/*.
 * Every other theme lives in src/app/<theme>/ and is served on the public URLs
 * by src/middleware.ts, which rewrites the routes listed in THEME_ROUTES.
 * The classic code is never removed, so switching back is a config change:
 *
 *   SITE_THEME=classic   (env var, e.g. in Vercel)  -> everyone gets classic
 *   ?theme=classic       (query string)            -> sticky preview via cookie
 *   ?theme=reset                                   -> drop the preview cookie
 */
export const THEMES = ["teletext", "classic"] as const;
export type Theme = (typeof THEMES)[number];

export const DEFAULT_THEME: Theme = "teletext";
export const THEME_COOKIE = "site-theme";

export function parseTheme(value: string | null | undefined): Theme | undefined {
    return THEMES.includes(value as Theme) ? (value as Theme) : undefined;
}

export function getConfiguredTheme(): Theme {
    return parseTheme(process.env.SITE_THEME) ?? DEFAULT_THEME;
}

/** Public paths a theme renders itself. Anything not listed falls through to the classic routes. */
export const THEME_ROUTES: Record<Exclude<Theme, "classic">, RegExp[]> = {
    teletext: [/^\/$/, /^\/(about|faq|rules|newsletter|parties|links|crew)$/, /^\/party\/[\w-]+$/],
};

/** Paths that only exist in a non-classic theme; classic visitors are sent home instead of a 404. */
export const THEME_ONLY_ROUTES: RegExp[] = [/^\/(parties|links|crew)$/, /^\/party\/[\w-]+$/];
