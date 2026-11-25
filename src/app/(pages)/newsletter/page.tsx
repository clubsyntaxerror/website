import { Metadata } from "next";
import { newsletterMetadata } from "../../../content/metadata";
import Footer from "../../../components/footer";
import NewsletterForm from "../../../components/NewsletterForm";

export const metadata: Metadata = newsletterMetadata;

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
