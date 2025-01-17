CREATE TABLE "mobile_devices" (
	"id" text PRIMARY KEY NOT NULL,
	"push_token" text NOT NULL,
	"is_swedish" boolean DEFAULT false NOT NULL
);
