import {texts} from "../text.js";

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
