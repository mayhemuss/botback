import {spreadsheetId} from "../tokens/token.js";
import {auth, googleSheets} from "../functions/googleAuth.js";
import {saveMessages} from "./saveMessages.js";
import {bot} from "../index.js";
import {ADMIN_ID} from "../tokens/url.js";


export const getRegType = async (chatId, registrationSheets, capId = false, commandType) => {
  try {
    console.log("fet")
    console.log("capId")
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `${registrationSheets}!G1:I10000`,
    })



    if (getRows.data.values === undefined) {
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: `${registrationSheets}!A:N`,
        valueInputOption: "RAW",
        resource: {
          values: [[
            "дата", "телефон", "имя", "подписка", "имя в телеге", "ник в телеге",
            "ид", commandType, "ref", "тип регистрации", "ip", "город", "регион", "страна"
          ]],
        }
      })

      return {types: false, index: -1, commandName: undefined, count: 0, userIds: []}

    } else {

      const allRow = getRows.data.values.map(elem => {
        const [userid, commandName, commandId] = elem
        return {userid, commandName, commandId}
      })

      const command = allRow.filter(elem => {
        const {commandId} = elem
        return commandId === capId
      })

      const userIds = command.map(elem => {
        return elem.userid
      })

      const user = allRow.map(elem => {
        return elem.userid
      })
      const index = user.indexOf(String(chatId))
      const types = index !== -1
      return {types, index, commandName: command[0]?.commandName, count: command.length, userIds}
    }
  } catch (e) {
    console.log(e)
    await bot.sendMessage(ADMIN_ID, JSON.stringify({e, chatId}))
    await saveMessages(JSON.stringify(e), chatId, "bot")
    return {types: false, index: -1, commandName: undefined, count: 0, userIds: []}
  }

}
