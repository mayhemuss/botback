import {returnLogs} from "../services/returnLogs.js";
import {bot} from "../index.js";
import {gamesList} from "../games/gamesList.js";
import {saveToExelArr} from "../services/exelData.js";
import DisciplineService from "../services/DisciplineService.js";
import UserRegService from "../services/UserRegService.js";
import {saveMessages} from "../services/saveMessages.js";
import {forms, texts} from "../text.js";
import {savetoEXEL} from "../services/savetoEXEL.js";

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
    callBack: async (chatId, text) => savetoEXEL(chatId)
  },

  "/admin": {
    callBack: async (chatId, text) => {
      await bot.sendMessage(chatId, "вот команды админа для тебя:\n" +
        "/logs - сохранение в таблицу всех логов\n" +
        "/tables - сохранение всех регистраций в гугл таблицу\n" +
        "/message - через пробел после этого необходимо добавить ид человека и через _ добавить текст сообщения")
      // const disciplines = await DisciplineService.getAll()
      //
      // const inline_keyboard = disciplines.map(dis => {
      //   return [{
      //     text: dis.name,
      //     callback_data: "admin_" + dis.callData
      //   }]
      // })
      //
      //
      // const form = {
      //   reply_markup: {
      //     inline_keyboard
      //   }
      // }
      //
      //
      // await bot.sendMessage(chatId, "меню управления админа", form)
      return "меню управления админа"
    }
  }

}