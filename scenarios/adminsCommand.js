import {returnLogs} from "../services/returnLogs.js";
import {bot} from "../index.js";
import {gamesList} from "../games/gamesList.js";
import {saveToExelArr} from "../services/exelData.js";
import DisciplineService from "../services/DisciplineService.js";
import UserRegService from "../services/UserRegService.js";
import {saveMessages} from "../services/saveMessages.js";
import {forms, texts} from "../text.js";

export const adminsCommand = {

  "/logs": {
    callBack: async (chatId, text) => {
      const allLogs = await returnLogs()
      await bot.sendMessage(chatId, allLogs)
      return "логи сохранены в таблицу"
    }
  },

  "/message": {
    callBack: async (chatId, text) => {
      if (text === "/message") {
        await bot.sendMessage(chatId, "необходимо добавить id человека и тело сообщения")
        return "не правильная форма отправки сообщения"
      }
      const [_, query] = text.split(" ")
      const [id, message] = query.split("_")
      await bot.sendMessage(id, message);
      await bot.sendMessage(chatId, "отправлено");
      return `сообщение ${message} отправлено на ${id}`
    }
  },

  "/tables": {
    callBack: async (chatId, text) => {
      const games = await DisciplineService.getAll()
      const users = await UserRegService.getAll()


      for (let game of gamesList) {

        const callData = game.anonced + "_" + game.dateEnd
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
      await bot.sendMessage(chatId, "сохранено все по таблицам")
      return "сохранено все по таблицам"
    }
  },

  // "/admin": {
  //   callBack: async (chatId, text) => {
  //     await bot.sendMessage(chatId, "вот команды админа для тебя:\n" +
  //       "/logs - сохранение в таблицу всех логов\n" +
  //       "/tables - сохранение всех регистраций в гугл таблицу\n" +
  //       "/message - через пробел после этого необходимо добавить ид человека и через _ добавить текст сообщения")
  //     const disciplines = await DisciplineService.getAll()
  //
  //     const inline_keyboard = disciplines.map(dis => {
  //       return [{
  //         text: dis.name,
  //         callback_data: "admin_" + dis.callData
  //       }]
  //     })
  //
  //
  //     const form = {
  //       reply_markup: {
  //         inline_keyboard
  //       }
  //     }
  //
  //
  //     await bot.sendMessage(chatId, "меню управления админа", form)
  //     return "меню управления админа"
  //   }
  // }

}