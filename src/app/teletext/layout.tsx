import "../../themes/teletext/teletext.css";
import { teletextFont } from "../../themes/teletext/font";
import { PageEntryProvider, Remote } from "../../themes/teletext/client";
import { getDirectory } from "../../themes/teletext/directory";

// Served on the public URLs by src/middleware.ts when the teletext theme is active.
export const revalidate = 3600;

export default async function TeletextLayout({ children }: { children: React.ReactNode }) {
    const directory = await getDirectory();
    return (
        <div className={`tt-room ${teletextFont.variable}`}>
            <PageEntryProvider directory={directory}>
                <div className="tt-tv">
                    <div className="tt-crt">
                        <div className="tt-screen" id="tt-screen">
                            {children}
                        </div>
                        <div className="tt-glass" aria-hidden="true" />
                    </div>
                    <div className="tt-tv-badge" aria-hidden="true">
                        SYNTAX&middot;VISION
                    </div>
                </div>
                <Remote />
            </PageEntryProvider>
        </div>
    );
}
