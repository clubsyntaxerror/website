"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();
    if (pathname === "/") return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 flex items-center justify-between px-6 h-16">
            <Link href="/">
                <img src="/images/logo.png" alt="Club Syntax Error" className="h-10" />
            </Link>
            <nav className="flex gap-4">
                <Link href="/about" className="navlink">About</Link>
                <Link href="/faq" className="navlink">FAQ</Link>
                <Link href="/rules" className="navlink">Rules</Link>
            </nav>
        </header>
    );
}
