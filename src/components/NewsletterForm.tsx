"use client";

import { useEffect } from "react";

export default function NewsletterForm() {
    useEffect(() => {
        const container = document.getElementById("emailoctopus-form-container");
        if (!container) return;
        const script = document.createElement("script");
        script.src = "https://eomail5.com/form/1590aff0-0d78-11f1-81d3-41c78b47f365.js";
        script.setAttribute("data-form", "1590aff0-0d78-11f1-81d3-41c78b47f365");
        script.async = true;
        container.appendChild(script);
        return () => { script.remove(); };
    }, []);

    return <div id="emailoctopus-form-container" />;
}
