import { Metadata } from "next";
import Footer from "../../components/footer";
import NewsletterForm from "../../components/NewsletterForm";

export const metadata: Metadata = {
    title: "Party Newsletter - Club Syntax Error",
    description: "Sign up for the Club Syntax Error party newsletter and be the first to know about upcoming events.",
    alternates: {
        canonical: "https://www.syntax-error.se/newsletter",
    },
    openGraph: {
        siteName: "Club Syntax Error",
        title: "Party Newsletter - Club Syntax Error",
        description:
            "Sign up for the Club Syntax Error party newsletter and be the first to know about upcoming events.",
        url: "https://www.syntax-error.se/newsletter",
        images: [
            {
                url: "https://www.syntax-error.se/video-poster.jpg",
                width: 1920,
                height: 1080,
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function NewsletterPage() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center pt-16">
                <section className="p-6 w-full md:w-2/3">
                    <h1 className="arcade-header text-center mb-8">Party Newsletter</h1>
                    <p className="text-gray-500 text-center mb-8">
                        Sign up to get notified about upcoming Syntax Error events.
                    </p>
                    <NewsletterForm />
                </section>
                <Footer />
            </main>
        </>
    );
}
