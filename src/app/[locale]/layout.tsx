import "../globals.css";
import { routing } from "../../i18n/routing";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const microKnight = localFont({
    src: "../../fonts/microknight.woff2",
    variable: "--font-microknight",
    display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: "https://syntax-error.se",
            images: [
                {
                    url: "https://syntax-error.se/video-poster.jpg",
                    width: 1920,
                    height: 1080,
                },
            ],
            type: "website",
            locale,
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: any }>;
}) {
    const { locale } = await params;
    if (!routing.locales.includes(locale)) {
        notFound();
    }
    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html>
            <body className={microKnight.className}>
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
                <Analytics />
                <script
                    async
                    src="https://eocampaign1.com/form/2b5e1218-c793-11ef-a7c8-9d7832b0d31b.js"
                    data-form="2b5e1218-c793-11ef-a7c8-9d7832b0d31b"
                ></script>
            </body>
        </html>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
