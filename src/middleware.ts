import { NextResponse, type NextRequest } from "next/server";
import { THEME_COOKIE, THEME_ONLY_ROUTES, THEME_ROUTES, getConfiguredTheme, parseTheme } from "./themes/config";

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const { pathname } = url;

    // ?theme=<name> sets a preview cookie, ?theme=reset clears it. Redirect to the clean URL either way.
    const requested = url.searchParams.get("theme");
    if (requested !== null) {
        const clean = url.clone();
        clean.searchParams.delete("theme");
        const response = NextResponse.redirect(clean);
        const theme = parseTheme(requested);
        if (theme) {
            response.cookies.set(THEME_COOKIE, theme, { path: "/", maxAge: 60 * 60 * 24 * 30, sameSite: "lax" });
        } else {
            response.cookies.delete(THEME_COOKIE);
        }
        return response;
    }

    // Theme internals are only reachable through their public URLs.
    for (const name of Object.keys(THEME_ROUTES)) {
        if (pathname === `/${name}` || pathname.startsWith(`/${name}/`)) {
            const publicUrl = url.clone();
            publicUrl.pathname = pathname.slice(name.length + 1) || "/";
            return NextResponse.redirect(publicUrl);
        }
    }

    const theme = parseTheme(request.cookies.get(THEME_COOKIE)?.value) ?? getConfiguredTheme();

    if (theme === "classic") {
        if (THEME_ONLY_ROUTES.some((route) => route.test(pathname))) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        return NextResponse.next();
    }

    if (THEME_ROUTES[theme].some((route) => route.test(pathname))) {
        const target = url.clone();
        target.pathname = `/${theme}${pathname === "/" ? "" : pathname}`;
        return NextResponse.rewrite(target);
    }

    return NextResponse.next();
}

export const config = {
    // Pages only: skip Next internals, the API and anything that looks like a file.
    matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
