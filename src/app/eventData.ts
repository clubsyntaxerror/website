import { google } from "googleapis";
import { cache } from "react";

export const revalidate = 3600;

function getVenueAddress(name: string, optionalAddress: string | undefined) {
    if (name === "H62") {
        return "Hornsgatan 62, Stockholm";
    }

    return optionalAddress;
}

export type Event = {
    startDate: Date;
    endDate: string;
    venueName: string;
    venueAddress: string | undefined;
    optionalCoverFee: string;
    eventName: string;
    eventDescription: string;
    shortDate: string;
    longDate: string;
    longTime: string;
    openingHours: string;
    optionalEventDescription: string | undefined;
    optionalCallToActionTitle: string | undefined;
    optionalCallToActionUrl: string | undefined;
    optionalVenueStreetAddress: string | undefined;
    optionalFacebookEventUrl: string | undefined;
    optionalAgeLimit: string | undefined;
};

export const getEvents = cache(async () => {
    try {
        const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
        const jwt = new google.auth.JWT(
            process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
            undefined,
            (process.env.GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
            target,
        );

        const sheets = google.sheets({ version: "v4", auth: jwt });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SPREADSHEET_ID,
            range: "Events", // sheet name
        });

        const rows = response.data.values;
        if (rows?.length) {
            return rows.slice(1).map(
                (event) =>
                    ({
                        // Skip header row
                        startDate: new Date(event[0]),
                        endDate: event[1] as string,
                        venueName: event[2] as string,
                        venueAddress: getVenueAddress(event[2] as string, event[8] as string),
                        optionalCoverFee: event[3] as string,
                        eventName: event[4] ? event[4] : "Syntax Error",
                        eventDescription: event[5] ? event[5] : "Welcome to Stockholm's monthly Video Game Nightclub!",
                        shortDate: new Date(event[0]).getUTCDate() + "/" + (new Date(event[0]).getMonth() + 1),
                        longDate: new Date(event[0]).toLocaleString("en-us", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        }),
                        longTime: new Date(event[0]).toLocaleString("en-us", {
                            hourCycle: "h24",
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                        openingHours:
                            new Date(event[0]).getHours().toString().padStart(2, "0") +
                            ":" +
                            new Date(event[0]).getMinutes().toString().padStart(2, "0") +
                            "-" +
                            new Date(event[1]).getHours().toString().padStart(2, "0") +
                            ":" +
                            new Date(event[1]).getMinutes().toString().padStart(2, "0"),
                        optionalEventDescription: event[5] as string | undefined,
                        optionalCallToActionTitle: event[6] as string | undefined,
                        optionalCallToActionUrl: event[7] as string | undefined,
                        optionalVenueStreetAddress: event[8] as string | undefined,
                        optionalFacebookEventUrl: event[9] as string | undefined,
                        optionalAgeLimit: event[10] as string | undefined,
                    }) satisfies Event,
            );
        }
    } catch (err) {
        console.log(err);
    }
    return [] as Event[];
});
