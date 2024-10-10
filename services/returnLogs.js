import {Logs} from "../models/models.js";
import {auth, googleSheets} from "../functions/googleAuth.js";
import {logsSheets, spreadsheetId} from "../tokens/token.js";

export const returnLogs = async () => {
  const AllLogs = await Logs.findAll()
  const logArr = AllLogs.map(log => {
    const {createdAt, body, chatId} = log
    return [body, chatId, createdAt];
  })

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${logsSheets}!A:C`,
    valueInputOption: "RAW",
    resource: {
      values: logArr,
    }
  })
  await Logs.destroy({
    where: {
      id: AllLogs.map(log => {
        return log.id
      })
    }
  });
  return `логи сохранены в https://docs.google.com/spreadsheets/d/${spreadsheetId}/`
}