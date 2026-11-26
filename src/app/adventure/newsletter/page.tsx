import type { Metadata } from "next";
import NewsletterForm from "../../../components/NewsletterForm";
import { Room } from "../../../themes/adventure/ui";
import { newsletterMetadata } from "../../../content/metadata";

export const metadata: Metadata = newsletterMetadata;

export default function RavenRoost() {
    return (
        <Room id="ravens">
            <p className="fg-white">
                Leave your address and a raven will find you whenever a new quest is posted. A few ravens a month, no
                more.
            </p>
            <div className="adv-newsletter">
                <NewsletterForm />
            </div>
        </Room>
    );
}
