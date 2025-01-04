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
