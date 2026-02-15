import Link from "next/link";

export default function Footer() {
    return (
        <footer className="p-6 w-full md:w-2/3">
            <img src="/images/invader-dance.gif" className="motion-reduce:hidden" aria-hidden={true} />
            <img src="/images/invader-logo.png" className="motion-safe:hidden" aria-hidden={true} />
            <h2 className="text-gray-500 text-center">
                Svenska Spelmusikfrämjandet © 2002-{new Date().getFullYear()}
            </h2>
            <p className="text-gray-500 text-center">
                Email us at{" "}
                <Link href="mailto:info@syntax-error.se" className="smallbutton mr-2">
                    info@syntax-error.se
                </Link>{" "}
                or message us on our{" "}
                <Link
                    href="https://www.facebook.com/SyntaxErrorSthlm/"
                    target="_blank"
                    className="smallbutton mr-2"
                >
                    Facebook Page
                </Link>{" "}
                for questions, ideas, corporate and co-op events
            </p>
        </footer>
    );
}
