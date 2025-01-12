import { relations } from "drizzle-orm";
import {
    date,
    pgTable,
    text,
    serial,
    index,
    numeric,
    timestamp,
    unique,
} from "drizzle-orm/pg-core";

export const callToAction = pgTable("call_to_action", {
    id: serial("id").primaryKey(),
    titleEng: text("title_eng").notNull(),
    titleSve: text("title_sve").notNull(),
    url: text("url").notNull(),
});

export const events = pgTable(
    "events",
    {
        id: serial("id").primaryKey(),
        eventStart: date("event_start", { mode: "date" }).notNull(),
        eventEnd: date("event_end", { mode: "date" }).notNull(),
        venueName: text("venue_name").notNull(),
        venueAddress: text("venue_address").notNull(),
        eventNameEng: text("event_name_eng").notNull(),
        eventNameSve: text("event_name_sve").notNull(),
        eventDescriptionEng: text("event_description_eng").notNull(),
        eventDescriptionSve: text("event_description_sve").notNull(),
        coverFee: text("cover_fee"),
        callToActionId: serial("call_to_action_id").references(
            () => callToAction.id,
            { onDelete: "cascade" },
        ),
        facebookEventUrl: text("facebook_event_url"),
    },
    ({ eventStart, eventEnd }) => [
        index("event_start_idx").on(eventStart),
        index("event_end_idx").on(eventEnd),
    ],
);

export const eventRelations = relations(events, ({ one }) => ({
    callToAction: one(callToAction, {
        fields: [events.callToActionId],
        references: [callToAction.id],
    }),
}));

export const eventMapLocations = pgTable("event_map_locations", {
    id: serial("id").primaryKey(),
    eventId: serial("event_id").references(() => events.id, {
        onDelete: "cascade",
    }),
    mapX: numeric("map_x").notNull(),
    mapY: numeric("map_y").notNull(),
});

export const eventMapLocationRelations = relations(
    eventMapLocations,
    ({ one }) => ({
        event: one(events, {
            fields: [eventMapLocations.eventId],
            references: [events.id],
        }),
    }),
);

export const safetyReports = pgTable(
    "safety_reports",
    {
        id: serial("id").primaryKey(),
        eventMapLocationId: serial("event_map_location_id").references(
            () => eventMapLocations.id,
            { onDelete: "set null" }, // Be VERY paranoid about deleting safety reports!
        ),
        description: text("description").notNull(),
        deviceId: text("device_id").notNull(),

        // Weak reference in case the user is deleted
        resolvedBy: text("resolved_by"),
    },
    ({ deviceId }) => [index("device_id_idx").on(deviceId)],
);

export const safetyReportRelations = relations(safetyReports, ({ one }) => ({
    eventMapLocation: one(eventMapLocations, {
        fields: [safetyReports.eventMapLocationId],
        references: [eventMapLocations.id],
    }),
}));

export const conversation = pgTable(
    "conversation",
    {
        createdAt: timestamp("created_at").defaultNow().notNull(),
        safetyReportId: serial("safety_report_id").references(
            () => safetyReports.id,
            { onDelete: "cascade" },
        ),
        crewUsername: text("crew_username"),
    },
    ({ safetyReportId }) => [index("safety_report_id_idx").on(safetyReportId)],
);

export const conversationRelations = relations(conversation, ({ one }) => ({
    safetyReport: one(safetyReports, {
        fields: [conversation.safetyReportId],
        references: [safetyReports.id],
    }),
}));

export const crewUsers = pgTable(
    "crew_users",
    {
        discordId: text("discord_id").primaryKey(),
        username: text("username").notNull(),
        email: text("email").notNull(),
        forename: text("forename").notNull(),
        surname: text("surname").notNull(),
        phoneNumber: text("phone_number").notNull(),
        bioEng: text("bio_eng"),
        bioSve: text("bio_sve"),
        profilePictureUrl: text("profile_picture_url"),
    },
    ({ username }) => [unique("username_idx").on(username)],
);

export const crewUserTokens = pgTable("crew_user_tokens", {
    id: serial("id").primaryKey(),
    crewUserId: text("crew_user_id").references(() => crewUsers.discordId),
    token: text("token").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const crewUserTokenRelations = relations(crewUserTokens, ({ one }) => ({
    crewUser: one(crewUsers, {
        fields: [crewUserTokens.crewUserId],
        references: [crewUsers.discordId],
    }),
}));
