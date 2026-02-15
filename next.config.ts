import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
