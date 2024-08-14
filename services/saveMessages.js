import {auth, googleSheets} from "../functions/googleAuth.js";
import {logsSheets, spreadsheetId} from "../tokens/token.js";

export const saveMessages = async (message, chatId, answer) => {
  const date = new Date().toLocaleString("ru-RU", {timeZone: 'Europe/Moscow'})
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${logsSheets}!A:H`,
    valueInputOption: "RAW",
    resource: {
      values: [[message, String(chatId),date, answer]],
    }
  })
}
