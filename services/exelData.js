import {auth, googleSheets} from "../functions/googleAuth.js";
import {spreadsheetId} from "../tokens/token.js";

export const saveDataToExel = async (date,
                                     phone,
                                     name,
                                     subscribe,
                                     telegramName,
                                     username,
                                     chatId,
                                     commandName,
                                     ref,
                                     registrationType,
                                     ip,
                                     city,
                                     region,
                                     country,
                                     exelSheet) => {

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${exelSheet}!A:N`,
    valueInputOption: "RAW",
    resource: {
      values: [[
        date, phone, name, subscribe, telegramName, username,
        chatId, commandName, ref, registrationType, ip, city, region, country
      ]],
    }
  })

}
export const saveToExelArr = async (arr, exelSheet) => {
  const data = arr.map((item) => {
    const {
      createdAt, chatId, telegramName, userName, ref, commandName, registrationType,
      ip, city, region, country, phone, name, steamName, rating
    } = item


    return [createdAt, name, phone, chatId, telegramName, userName, ref, commandName,rating,
      registrationType, steamName, ip, city, region, country,]
  })
  data.unshift(["дата", "имя", "телефон", "ид чата", "имя в телеге","ссылка на телегу", "реф",
    "имя команды", "рейтинг","тип регистрации", "имя в стиме", "ип", "город", "регион", "страна"])
  await googleSheets.spreadsheets.values.clear({
    auth,
    spreadsheetId,
    range: `${exelSheet}!A1:O5000`,
  })

  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: `${exelSheet}!A:O`,
    valueInputOption: "RAW",
    resource: {
      values: data,
    }
  });

}

export const getDataFromExel = async (exelSheet) => {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `${exelSheet}!A1:N10000`,
  })

  if (getRows.data.values === undefined) {
    await saveDataToExel("дата", "телефон", "имя", "подписка", "имя в телеге", "ник в телеге",
      "ид", "имя команды/стим", "ref", "тип регистрации", "ip", "город", "регион", "страна", exelSheet)
    return []
  } else {

    const allRow = getRows.data.values.map(elem => {
      const [
        date, phone, name, subscribe, telegramName, username,
        chatId, commandName, ref, registrationType, ip, city, region, country
      ] = elem
      return {
        date, phone, name, subscribe, telegramName, username,
        chatId, commandName, ref, registrationType, ip, city, region, country
      }
    })
    return allRow
  }
}

export const deleteDatainExel = async (exelSheet, index) => {
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `${exelSheet}!A${index + 1}:N${index + 1}`,
    valueInputOption: "RAW",
    resource: {
      values: [["", "", "", "", "", "", "", "", "", "", "", "", "", "",]],
    }
  });
}

