"use client";

export default function Pong() {
    return (
        <div className="absolute left-0 top-0 h-full w-36 pointer-events-none">
            <div className="ping"></div>
            <div className="ball"></div>
        </div>
    );
}
