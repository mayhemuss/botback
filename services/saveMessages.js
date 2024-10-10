import {auth, googleSheets} from "../functions/googleAuth.js";
import {logsSheets, spreadsheetId} from "../tokens/token.js";
import {Logs} from "../models/models.js";

export const saveMessages = async (body, chatId) => {
  try {
    await Logs.create({
      chatId, body
    })
  } catch (err) {
    console.log(err)
  }


  // const date = new Date().toLocaleString("ru-RU", {timeZone: 'Europe/Moscow'})
  // await googleSheets.spreadsheets.values.append({
  //   auth,
  //   spreadsheetId,
  //   range: logsSheets,
  //   valueInputOption: "RAW",
  //   resource: {
  //     values: [[message, String(chatId),date, answer]],
  //   }
  // })
}
