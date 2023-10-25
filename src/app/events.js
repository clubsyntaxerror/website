import { google } from 'googleapis';

export async function getEvents() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Events', // sheet name
    });

    const rows = response.data.values;
    if (rows.length) {
      return rows.map((event) => ({
        startDate: event[0],
        endDate: event[1],
        venueName: event[2],
        optionalEventName: event[3],
        optionalEventDescription: event[4],
        optionalCallToActionTitle: event[5],
        optionalCallToActionUrl: event[6]
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}