import {spreadsheetId} from "../tokens/token.js";
import {auth, googleSheets} from "../functions/googleAuth.js";


export const getRegType = async (chatId, registrationSheets, capId = false) => {
  try {
    console.log("fet")
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `${registrationSheets}!G1:I10000`,
    })

    console.log("строки", JSON.stringify(getRows))

    if (getRows.data.values === undefined) {
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: `${registrationSheets}!A:N`,
        valueInputOption: "RAW",
        resource: {
          values: [["дата", "телефон", "имя", "подписка", "имя в телеге", "ник в телеге", "ид", "ref", "имя команды", "тип регистрации", "ip", "город", "регион", "страна"]],
        }
      })

      return {types: false, index: -1, commandName: undefined, count: 0, userIds: []}

    } else {

      const allRow = getRows.data.values.map(elem => {
        const [userid, commandId, commandName] = elem
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
    return {types: false, index: -1, commandName: undefined, count: 0, userIds: []}
  }

}
