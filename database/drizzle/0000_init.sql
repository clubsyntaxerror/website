CREATE TABLE "call_to_action" (
	"id" serial PRIMARY KEY NOT NULL,
	"title_eng" text NOT NULL,
	"title_sve" text NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversation" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"safety_report_id" uuid,
	"crew_username" text,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crew_user_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"crew_user_id" text,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "crew_users" (
	"discord_id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"forename" text NOT NULL,
	"surname" text NOT NULL,
	"phone_number" text NOT NULL,
	"bio_eng" text,
	"bio_sve" text,
	"profile_picture_url" text,
	CONSTRAINT "username_idx" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "event_map_locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" serial NOT NULL,
	"map_x" numeric NOT NULL,
	"map_y" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_start" date NOT NULL,
	"event_end" date NOT NULL,
	"venue_name" text NOT NULL,
	"venue_address" text NOT NULL,
	"event_name_eng" text NOT NULL,
	"event_name_sve" text NOT NULL,
	"event_description_eng" text NOT NULL,
	"event_description_sve" text NOT NULL,
	"cover_fee" text,
	"call_to_action_id" serial NOT NULL,
	"facebook_event_url" text
);
--> statement-breakpoint
CREATE TABLE "safety_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_map_location_id" serial NOT NULL,
	"description" text NOT NULL,
	"device_id" text NOT NULL,
	"resolved_by" text
);
--> statement-breakpoint
ALTER TABLE "conversation" ADD CONSTRAINT "conversation_safety_report_id_safety_reports_id_fk" FOREIGN KEY ("safety_report_id") REFERENCES "public"."safety_reports"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "crew_user_tokens" ADD CONSTRAINT "crew_user_tokens_crew_user_id_crew_users_discord_id_fk" FOREIGN KEY ("crew_user_id") REFERENCES "public"."crew_users"("discord_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "event_map_locations" ADD CONSTRAINT "event_map_locations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_call_to_action_id_call_to_action_id_fk" FOREIGN KEY ("call_to_action_id") REFERENCES "public"."call_to_action"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "safety_reports" ADD CONSTRAINT "safety_reports_event_map_location_id_event_map_locations_id_fk" FOREIGN KEY ("event_map_location_id") REFERENCES "public"."event_map_locations"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "safety_report_id_idx" ON "conversation" USING btree ("safety_report_id");--> statement-breakpoint
CREATE INDEX "event_start_idx" ON "events" USING btree ("event_start");--> statement-breakpoint
CREATE INDEX "event_end_idx" ON "events" USING btree ("event_end");--> statement-breakpoint
CREATE INDEX "device_id_idx" ON "safety_reports" USING btree ("device_id");