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

## Themes

The site can be fronted by a theme without touching the original ("classic") pages in `src/app/page.tsx` and `src/app/(pages)/`.
`src/middleware.ts` rewrites the public URLs to `src/app/<theme>/…` for the active theme (see `src/themes/config.ts`).

- Default theme: `teletext` (Text-TV style, 40 columns, page numbers, Fastext buttons).
- Switch everyone back to the old site: set `SITE_THEME=classic` (e.g. in Vercel) and redeploy.
- Preview a theme in your own browser: add `?theme=classic` or `?theme=teletext` to any URL; `?theme=reset` clears it.

Teletext pages: 100 index, 200 parties (201+ each upcoming party, at `/party/YYYY-MM-DD`), 300 about, 400 FAQ, 500 rules, 600 newsletter, 700 links, 800 crew & artists.
Party banners are generated from the events sheet; words like Halloween, Xmas, Pride, Release or Arcade in the name or description steer the art.
Shared copy lives in `src/content/`.
