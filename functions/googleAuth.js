import {google} from "googleapis";


export const googleAuth = async () => {
  auth = new google.auth.GoogleAuth({
    keyFile: "tokens/credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  client = await auth.getClient();
  googleSheets = google.sheets({version: "v4", auth: client});
}

export let auth = new google.auth.GoogleAuth({
  keyFile: "tokens/credentials.json",
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

// Create client instance for auth
let client = await auth.getClient();

// Instance of Google Sheets API
export let googleSheets = google.sheets({version: "v4", auth: client});


// let timerId = setTimeout(async function auth() {
//   await googleAuth()
//
//   timerId = setTimeout(auth, 60000000); // (*)
// }, 60000000);
