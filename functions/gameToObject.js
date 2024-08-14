import {inlineGameList} from "../games/inlineGameList.js";
import {gamesList} from "../games/gamesList.js";
import {bigTeam, capitanRegConfirm, sky_logo, smallTeam, texts, userRegConfirm} from "../text.js";
import {timeCheck} from "./timeCheck.js";
import {getRegType} from "../services/getRegType.js";

export const gameToObject = (list, bot) => {
  const actualList = timeCheck(list)

  const obj = {

    AllGameList: {
      editRegistrationMenu: async (chatId, message_id) => {
        console.log("AllGameList")
        const message = inlineGameList(timeCheck(gamesList))
        const form = {
          chat_id: chatId,
          message_id
        }
        const lastForm = {
          chat_id: chatId,
          message_id: +message_id - 1
        }

        try {
          await bot.editMessageMedia({
              type: "photo",
              media: sky_logo
            },
            lastForm
          )
        } catch (e) {
        }
        await bot.editMessageText(message.text, form)
        return await bot.editMessageReplyMarkup({
          inline_keyboard: message.form.reply_markup.inline_keyboard
        }, form)
      }
    },

    AwaitNew: {
      editRegistrationMenu: async (chatId, message_id) => {
        console.log("AwaitNew")
        const form = {
          chat_id: chatId,
          message_id
        }
        const lastForm = {
          chat_id: chatId,
          message_id: +message_id - 1
        }
        try {
          await bot.editMessageMedia({
              type: "photo",
              media: sky_logo
            },
            lastForm
          )
        } catch (e) {
        }

        await bot.editMessageText(texts.AwaitText,
          form
        )

        return await bot.editMessageReplyMarkup({
            inline_keyboard: [
              [{text: "Ожидаем анонс мероприятий", callback_data: "AllGameList"}],
            ]
          }, form
        )
      }
    }
  }


  actualList.forEach(event => {
    if (event.commandMemberCount > 1) {

      //регистрация юзера
      obj[event.callData + "_user"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          console.log("регистрация юзера")
          const regText = "Регистрация"
          const form = {
            chat_id: chatId,
            message_id
          }
          const lastForm = {
            chat_id: chatId,
            message_id: +message_id - 1
          }
          try {
            await bot.editMessageMedia({
                type: "photo",
                media: event.imageUrl
              },
              lastForm
            )
          } catch (e) {

          }


          await bot.editMessageText(texts.userReg,
            form
          )

          return await bot.editMessageReplyMarkup({
              inline_keyboard: userRegConfirm(event.callData)
            }, form
          )
        }
      }

      //регистрация капитана
      obj[event.callData + "_capitan"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          console.log("регистрация капитана")
          const {types} = await getRegType(chatId, event.registrationSheets)
          const regText = types ? "Изменить данные" : "Зарегистрироваться"
          const form = {
            chat_id: chatId,
            message_id
          }
          const lastForm = {
            chat_id: chatId,
            message_id: +message_id - 1
          }
          try {
            await bot.editMessageMedia({
                type: "photo",
                media: event.imageUrl
              },
              lastForm
            )
          } catch (e) {
          }

          await bot.editMessageText(texts.capitanRegConf,
            form
          )


          return await bot.editMessageReplyMarkup({
              inline_keyboard: capitanRegConfirm({
                regText,
                callData: event.callData,
                commandMemberCount: event.commandMemberCount,

              }, event.gameName, event.callData, regText, event.webAppUrl, event.callData)
            }, form
          )

        }
      }

      //меню игры на больше 1
      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          console.log("меню игры на больше 1")
          const form = {
            chat_id: chatId,
            message_id
          }
          const lastForm = {
            chat_id: chatId,
            message_id: +message_id - 1
          }

          try {
            await bot.editMessageMedia({
                type: "photo",
                media: event.imageUrl
              },
              lastForm
            )
          } catch (e) {
          }

          await bot.editMessageText(event.descriptions,
            form
          )

          return await bot.editMessageReplyMarkup({
              inline_keyboard: bigTeam(event.gameName, "AllGameList", `${event.callData}`, event.callData,)
            }, form
          )
        }
      }

      //нет команды
      obj[event.callData + "_noComand"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          console.log("нет команды")
          const form = {
            chat_id: chatId,
            message_id
          }
          const lastForm = {
            chat_id: chatId,
            message_id: +message_id - 1
          }
          try {
            await bot.editMessageMedia({
                type: "photo",
                media: event.imageUrl
              },
              lastForm
            )
          } catch (e) {
          }

          console.log("photo")
          await bot.editMessageText(`Вы всегда можете найти себе боевых товарищей в комментариях под постом с анонсом мероприятия ${event.anoncedPost}`,
            form
          )
          console.log("text")
          return await bot.editMessageReplyMarkup({
            inline_keyboard: [
              [{
                text: "<<- Назад",
                callback_data: event.callData
              }]
            ]
          }, form)
        }
      }
    }

    //reglament
    obj[`${event.callData}_reglament`] = {
      editRegistrationMenu: async (chatId, message_id) => {
        console.log("reglament")
        const form = {
          chat_id: chatId,
          message_id
        }
        const lastForm = {
          chat_id: chatId,
          message_id: +message_id - 1
        }
        try {
          await bot.editMessageMedia({
              type: "photo",
              media: event.imageUrl
            },
            lastForm
          )
        } catch (e) {
        }

        console.log("photo")
        await bot.editMessageText(event.reglaments,
          form
        )
        console.log("text")
        await bot.editMessageReplyMarkup({
            inline_keyboard: [
              [{
                text: "<<- Назад",
                callback_data: event.callData
              }]
            ]
          }, form
        )
        console.log("form")
      }
    }

    if (event.commandMemberCount === 1) {

      //регистрация одиночных
      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          console.log("регистрация одиночных")
          const {types} = getRegType(chatId, event.registrationSheets)
          const regText = types ? "Изменить данные" : "Зарегистрироваться"
          const regType = "user"
          const form = {
            chat_id: chatId,
            message_id
          }
          const lastForm = {
            chat_id: chatId,
            message_id: +message_id - 1
          }
          try {
            await bot.editMessageMedia({
                type: "photo",
                media: event.imageUrl
              },
              lastForm
            )
          } catch (e) {
          }

          await bot.editMessageText(event.descriptions,
            form
          )

          return await bot.editMessageReplyMarkup({
              inline_keyboard: smallTeam(
                event.gameName,
                "AllGameList",
                regText,
                {
                  regText,
                  callData: event.callData,
                  commandMemberCount: event.commandMemberCount,
                  ref: "",
                  regType
                },
                event.webAppUrl,
                event.callData
              )
            }, form
          )
        }
      }
    }
  })


  console.log(JSON.stringify(obj))
  return obj
}
