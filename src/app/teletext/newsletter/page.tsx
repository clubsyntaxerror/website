import type { Metadata } from "next";
import NewsletterForm from "../../../components/NewsletterForm";
import { PAGES } from "../../../themes/teletext/directory";
import { Gap, TeletextPage, TitleBar } from "../../../themes/teletext/ui";
import { newsletterMetadata } from "../../../content/metadata";

export const metadata: Metadata = newsletterMetadata;

export default function NewsletterPage() {
    return (
        <TeletextPage number={PAGES.newsletter.number}>
            <TitleBar bg="yellow" color="black">
                PARTY NEWSLETTER
            </TitleBar>
            <Gap />
            <p className="fg-cyan">Sign up to get notified about upcoming Syntax Error events.</p>
            <Gap />
            <div className="tt-newsletter">
                <NewsletterForm />
            </div>
        </TeletextPage>
    );
}
