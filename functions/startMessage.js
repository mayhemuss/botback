import {timeCheck} from "./timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import {bot} from "../index.js";
import {sky_logo, texts} from "../text.js";


export const inlineGameList = (list) => {
  return list.length > 0 ? {
      text: texts.helloText,
      form: {
        reply_markup: {
          inline_keyboard:
            list.map(event => {
              return [{callback_data: event.callData, text: event.gameName}]
            }),
        }
      }
    } :
    {
      text: texts.AwaitText,
      form: {
        reply_markup: {
          inline_keyboard: [
            [{text: "Посмотреть Анонсированные мероприятия", callback_data: "AllGameList"}],
          ]
        }
      }
    }
}

export const startMessage = async (chatId) => {

  const message = inlineGameList(timeCheck(gamesList))

  await bot.sendPhoto(chatId, sky_logo)
  return await bot.sendMessage(chatId, message.text, message.form);
}
