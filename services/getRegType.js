import {spreadsheetId} from "../tokens/token.js";
import {auth, googleSheets} from "../functions/googleAuth.js";
import {saveMessages} from "./saveMessages.js";
import {bot} from "../index.js";
import {ADMIN_ID} from "../tokens/url.js";
import {getDataFromExel, saveDataToExel} from "./exelData.js";


export const getRegType = async (chatId, registrationSheets, capId = false, commandType) => {
  try {
    console.log("getRegType")

    //получение данных с экселя
    const exelData = await getDataFromExel(registrationSheets)

    //если данных нету
    if (exelData.length ===0) {
      return {types: false, index: -1, commandName: undefined, count: 0, userIds: []}
    //если данные есть
    } else {

      //получение всех участников команды
      const command = exelData.filter(elem => {
        const {ref} = elem
        return ref === capId
      })

      //получение всех ид участников команды
      const userIds = command.map(elem => {
        return elem.chatId
      })

      //получение юзера
      const user = exelData.map(elem => {
        return elem.chatId
      })
      //проверка есть ли юзер
      const index = user.indexOf(String(chatId))
      const types = index !== -1

      return {types, index, commandName: command[0]?.commandName, count: command.length, userIds, exelData}
    }
  } catch (e) {
    console.log(e)
    await bot.sendMessage(ADMIN_ID, JSON.stringify({e, chatId}))
    await saveMessages(JSON.stringify(e), chatId, "bot")
    return {types: false, index: -1, commandName: undefined, count: 0, userIds: []}
  }

}
