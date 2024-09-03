import {spreadsheetId} from "../tokens/token.js";
import {auth, googleSheets} from "../functions/googleAuth.js";

export const getCommandName = async (registrationSheets, capId) => {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: `${registrationSheets}!G1:I10000`,
  })
  const command = getRows.data.values.map(elem => {
    const [userid,commandName , commandId] = elem
    return {userid, commandName, commandId}
  }).filter(elem => {
    const {commandId} = elem
    return commandId === capId
  })
  console.log(command)

  const userIds = command.map(elem => {
    return elem?.userid
  })

  return {commandName: command[0]?.commandName, count: command.length, userIds}
}
