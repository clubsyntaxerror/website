import { google } from 'googleapis';

function getVenueAddress(name, optionalAddress) {
  if (name === 'H62') {
    return 'Hornsgatan 62, Stockholm'
  }

  return optionalAddress
}

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
        venueAddress: getVenueAddress(event[2], event[8]),
        optionalCoverFee: event[3],
        eventName: event[4] ? event[4] : 'Syntax Error ' + new Date(event[0]).getUTCDate() + '/' + (new Date(event[0]).getMonth()+1),
        shortDate: new Date(event[0]).getUTCDate() + '/' + (new Date(event[0]).getMonth()+1),
        longDate: new Date(event[0]).toLocaleString('en-us', { weekday: 'long', day: 'numeric', month: 'long'}),
        longTime: new Date(event[0]).toLocaleString('en-us', {hourCycle: 'h24', hour: '2-digit', minute: '2-digit' }),
        openingHours: (new Date(event[0]).getHours()).toString().padStart(2,'0') + ':' + (new Date(event[0]).getMinutes()).toString().padStart(2,'0') + '-' + (new Date(event[1]).getHours()).toString().padStart(2,'0') + ':' + (new Date(event[1]).getMinutes()).toString().padStart(2,'0'),
        optionalEventDescription: event[5],
        optionalCallToActionTitle: event[6],
        optionalCallToActionUrl: event[7]
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}

