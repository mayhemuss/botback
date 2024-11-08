import {auth, googleSheets} from "../functions/googleAuth.js";
import {spreadsheetId} from "../tokens/token.js";


export const saveToExelArr = async (arr, exelSheet) => {

  const data = arr.map((item) => {
    const {
      createdAt, chatId, telegramName, userName, ref, commandName, registrationType,
      ip, city, region, country, phone, name, steamName, rating, position
    } = item


    return [createdAt, name, phone, chatId, telegramName, userName, ref, commandName, rating,
      registrationType, steamName, ip, city, region, country, position]
  })

  data.unshift(["дата", "имя", "телефон", "ид чата", "имя в телеге", "ссылка на телегу", "реф",
    "имя команды", "рейтинг", "тип регистрации", "имя в стиме", "ип", "город", "регион", "страна","позиция"])

  await googleSheets.spreadsheets.values.clear({
    auth,
    spreadsheetId,
    range: `${exelSheet}!A1:P5000`,
  })

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${exelSheet}!A:P`,
    valueInputOption: "RAW",
    resource: {
      values: data,
    }
  });

}

