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

