import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Pages that only exist in the dungeon were briefly public at the root; keep old links working.
    async redirects() {
        return [
            { source: "/:page(parties|crew|links)", destination: "/dungeon/:page", permanent: false },
            { source: "/party/:slug", destination: "/dungeon/party/:slug", permanent: false },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/privacy-policy-crewapp",
                destination: "/privacy-policy-crewapp.html",
            },
        ];
    },
};

export default nextConfig;
