import { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/footer";

export const metadata: Metadata = {
    title: "Privacy Policy - Syntax Error Events App",
    description:
        "Privacy policy for the Syntax Error Events companion app. Learn what data we collect, how we use it, and how you can delete it.",
    alternates: {
        canonical: "https://www.syntax-error.se/privacy-policy-crewapp",
    },
    openGraph: {
        siteName: "Club Syntax Error",
        title: "Privacy Policy - Syntax Error Events App",
        description: "Privacy policy for the Syntax Error Events companion app.",
        url: "https://www.syntax-error.se/privacy-policy-crewapp",
        locale: "en_US",
        type: "website",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className="flex min-h-screen flex-col items-center pt-16">
            <section className="w-full rainbow_bg_animated text-black flex flex-col md:items-center smallzigzag">
                <div className="p-6 md:py-12 md:w-2/3">
                    <h1 className="text-black text-center mb-2">Privacy Policy Crewapp</h1>
                    <p className="text-center text-sm opacity-70 mb-0">
                        "Syntax Error Events" Mobile App Privacy Policy - Last updated: February 15, 2026
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <div className="text-gray-500">
                    <p>
                        Syntax Error Events (&ldquo;the App&rdquo;) is operated by Svenska Spelmusikfrämjandet, a
                        non-profit organisation based in Sweden. This policy explains what data we collect, why, and how
                        you can control it.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>1. Data We Collect</h3>
                <div className="text-gray-500">
                    <p>When you sign in with Discord, we receive and store the following information:</p>
                    <div className="overflow-x-auto my-4">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th className="border border-gray-700 bg-gray-900 px-3 py-2 text-left text-gray-300">
                                        Data
                                    </th>
                                    <th className="border border-gray-700 bg-gray-900 px-3 py-2 text-left text-gray-300">
                                        Source
                                    </th>
                                    <th className="border border-gray-700 bg-gray-900 px-3 py-2 text-left text-gray-300">
                                        Purpose
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-700 px-3 py-2">Discord user ID</td>
                                    <td className="border border-gray-700 px-3 py-2">Discord OAuth</td>
                                    <td className="border border-gray-700 px-3 py-2">Identify your account</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-700 px-3 py-2">
                                        Discord username / display name
                                    </td>
                                    <td className="border border-gray-700 px-3 py-2">Discord OAuth</td>
                                    <td className="border border-gray-700 px-3 py-2">Show your name on task signups</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-700 px-3 py-2">Discord email</td>
                                    <td className="border border-gray-700 px-3 py-2">Discord OAuth</td>
                                    <td className="border border-gray-700 px-3 py-2">Identify your account</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-700 px-3 py-2">Discord avatar URL</td>
                                    <td className="border border-gray-700 px-3 py-2">Discord OAuth</td>
                                    <td className="border border-gray-700 px-3 py-2">
                                        Display your profile picture in the app
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-700 px-3 py-2">Discord server roles</td>
                                    <td className="border border-gray-700 px-3 py-2">Discord API (via our server)</td>
                                    <td className="border border-gray-700 px-3 py-2">
                                        Determine your access level (crew / volunteer)
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-700 px-3 py-2">Task signups</td>
                                    <td className="border border-gray-700 px-3 py-2">Created by you in the app</td>
                                    <td className="border border-gray-700 px-3 py-2">
                                        Track which tasks you have volunteered for
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        We do <strong>not</strong> collect your password, location, contacts, or any device identifiers.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>2. How We Use Your Data</h3>
                <div className="text-gray-500">
                    <p>Your data is used exclusively to:</p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li>Authenticate you in the app via Discord</li>
                        <li>Display your name and avatar to other crew members</li>
                        <li>Record which event tasks you have signed up for</li>
                        <li>Verify your Discord role to grant appropriate access</li>
                    </ul>
                    <p>
                        We do not use your data for advertising, analytics, profiling, or any purpose beyond operating
                        the app.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>3. Data Storage and Security</h3>
                <div className="text-gray-500">
                    <p>
                        Your data is stored in{" "}
                        <Link href="https://supabase.com" target="_blank" className="smallbutton">
                            Supabase
                        </Link>
                        , a cloud database platform. All data is transmitted over HTTPS (encrypted in transit) and
                        stored in a secured database with row-level security policies. Only authenticated users can
                        access data, and users can only modify their own task assignments.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>4. Data Sharing</h3>
                <div className="text-gray-500">
                    <p>
                        We do <strong>not</strong> sell, trade, or share your personal data with any third parties. Your
                        data is only processed by:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li>
                            <strong>Discord</strong> - for authentication (governed by{" "}
                            <Link href="https://discord.com/privacy" target="_blank" className="smallbutton">
                                Discord&apos;s Privacy Policy
                            </Link>
                            )
                        </li>
                        <li>
                            <strong>Supabase</strong> - for data storage (governed by{" "}
                            <Link href="https://supabase.com/privacy" target="_blank" className="smallbutton">
                                Supabase&apos;s Privacy Policy
                            </Link>
                            )
                        </li>
                    </ul>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>5. Data Visible to Other Users</h3>
                <div className="text-gray-500">
                    <p>
                        Other crew members and volunteers using the app can see your Discord username, avatar, role, and
                        which tasks you have signed up for. This is essential for coordinating event tasks as a team.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>6. Data Retention</h3>
                <div className="text-gray-500">
                    <p>
                        Your data is retained for as long as you have an account. Task signup records are kept for
                        historical reference of past events. You can delete all your data at any time (see below).
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>7. Your Rights - Data Deletion</h3>
                <div className="text-gray-500">
                    <p>You can delete all of your data directly from the app. This will permanently remove:</p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li>Your user account</li>
                        <li>All your task signup records</li>
                        <li>All stored profile information</li>
                    </ul>
                    <p>
                        After deletion, no personal data is retained. You may also contact us to request data deletion
                        manually.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>8. Children&apos;s Privacy</h3>
                <div className="text-gray-500">
                    <p>
                        This app is not directed at children under 13. We do not knowingly collect data from children.
                        If you believe a child has provided us with personal data, please contact us so we can remove
                        it.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>9. Changes to This Policy</h3>
                <div className="text-gray-500">
                    <p>
                        We may update this policy from time to time. Changes will be posted on this page with an updated
                        date. Continued use of the app after changes constitutes acceptance of the updated policy.
                    </p>
                </div>
            </section>

            <section className="p-6 w-full md:w-2/3">
                <h3>10. Contact</h3>
                <div className="text-gray-500">
                    <p>
                        If you have questions about this privacy policy or your data, contact us at:{" "}
                        <Link href="mailto:info@syntax-error.se" className="smallbutton">
                            info@syntax-error.se
                        </Link>
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
