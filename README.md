# Syntax Error Web Site

This is the source code for our new website that pulls events from our Google Drive events sheet.

## Getting Started

To work on the website, you will need to have node installed and you will need to set the following environment variables in `.env.local`:

- `GOOGLE_SHEETS_CLIENT_EMAIL`: The client email for the Google Sheets API.
- `GOOGLE_SHEETS_PRIVATE_KEY`: The private key for the Google Sheets API.
- `SPREADSHEET_ID`: The ID of the Google Sheets spreadsheet that contains the events.

First, install packages with `npm ci` and then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Links

Icons for hero are 18x18px IOS 17 filled white from icons8.com

## The dungeon

The site is the original ("classic") one. An alternative adventure theme, a C64 dungeon crawler where every page is a room on a map with a command line at the bottom, lives under `/dungeon` (`src/app/dungeon/`, with its parts in `src/themes/adventure/`).

Rooms: entrance hall `/dungeon`, quest board `/dungeon/parties` (each upcoming party at `/dungeon/party/YYYY-MM-DD`), oracle `/dungeon/faq`, guard post `/dungeon/rules`, archives `/dungeon/about`, guild hall `/dungeon/crew`, raven roost `/dungeon/newsletter`, warp zone `/dungeon/links`; the dance floor is the next party.
Type HELP on the site for the commands (N/S/E/W, GO ORACLE, QUESTS, READ 1, TICKET, ASK AGE LIMIT, ...).
Party banners are generated from the events sheet; words like Adventure, Halloween, Xmas, Pride, Release or Arcade in the name or description steer the art.
Photos are converted to C64 colours by `npm run photos` (see `scripts/build-photos.mjs`); the output in `public/adventure/` is committed.
Shared copy lives in `src/content/`.
