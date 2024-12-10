import DisciplineService from "./DisciplineService.js";
import UserRegService from "./UserRegService.js";
import {gamesList} from "../games/gamesList.js";
import {saveToExelArr} from "./exelData.js";
import {ADMIN_ID} from "../tokens/url.js";
import {saveMessages} from "./saveMessages.js";
import {bot} from "../index.js";

export const savetoEXEL = async (chatId = ADMIN_ID) => {

  const games = await DisciplineService.getAll()
  const users = await UserRegService.getAll()


  for (let game of gamesList) {

    const callData = game.callData ? game.callData : game.anonced + "_" + game.dateEnd
    const {registrationSheets, lotterySheets, type} = game
    const disciplineId = games.filter(dis => {

      return dis.callData === callData
    })[0]?.id

    const currentUsers = users.filter(user => {
      return user.disciplineId === disciplineId
    })

    try {
      if (type === "game" && currentUsers.length > 0) {
        await saveToExelArr(currentUsers, registrationSheets)
      }
      if (type === "lottery" && currentUsers.length > 0) {
        const regNotDone = []
        const regDone = []

        currentUsers.forEach(user => {
          if (user.lotteryRegFull === true) {
            regDone.push(user)
          } else {
            regNotDone.push(user)
          }

        })
        await saveToExelArr(regNotDone, registrationSheets)
        await saveToExelArr(regDone, lotterySheets)
      }
    } catch (e) {
      if (type === "lottery") {
        await bot.sendMessage(chatId, `проверь, существует ли страница в таблице ${registrationSheets} и ${lotterySheets}`)
        await saveMessages(JSON.stringify(e), chatId)
      }
      if (type === "game") {
        await bot.sendMessage(chatId, `проверь, существует ли страница в таблице ${registrationSheets}`)

        await saveMessages(JSON.stringify(e), chatId)
      }
      console.log(e)
    }
  }

  // await bot.sendMessage(chatId, `ВСЕ ПО ТАБЛИЦАМ`)

}