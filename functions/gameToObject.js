import {inlineGameList} from "../games/inlineGameList.js";
import {gamesList} from "../games/gamesList.js";
import {bigTeam, capitanRegConfirm, capitanTeam, lottery, sky_logo, smallTeam, texts, userRegConfirm} from "../text.js";
import {timeCheck} from "./timeCheck.js";
import {getRegType} from "../services/getRegType.js";
import {editMessages} from "./editMessages.js";
import {getCommand} from "../services/getCommand.js";

export const gameToObject = (list) => {
  const actualList = timeCheck(list)

  const obj = {

    AllGameList: {
      editRegistrationMenu: async (chatId, message_id) => {
        const message = inlineGameList(timeCheck(gamesList))
        const inline_keyboard = message.form.reply_markup.inline_keyboard

        return await editMessages(chatId, message_id, inline_keyboard, message.text, sky_logo)

      }
    },

    AwaitNew: {
      editRegistrationMenu: async (chatId, message_id) => {
        const inline_keyboard = [
          [{text: "Ожидаем анонс мероприятий", callback_data: "AllGameList"}],
        ]
        return await editMessages(chatId, message_id, inline_keyboard, texts.AwaitText, sky_logo)

      }
    },
    // deleteMember: {
    //   editRegistrationMenu: async (chatId, message_id, {id}, callData) => {
    //     const registrationSheets = actualList.filter(game => {
    //       return game.callData === callData
    //     })[0].registrationSheets
    //     const allRow = await getDataFromExel(registrationSheets)
    //     const member = allRow.filter(row => {
    //       return row.chatId === chatId
    //     })[0]
    //
    //     if (member.registrationType === "capitan") {
    //       const index = allRow.findIndex(row => {
    //         return row.chatId === id
    //       })
    //
    //       await deleteDatainExel(registrationSheets, index)
    //       return "Done"
    //
    //     } else {
    //       // const message = inlineGameList(timeCheck(gamesList))
    //       // const inline_keyboard = message.form.reply_markup.inline_keyboard
    //       return "notDone"
    //       // return await editMessages(chatId, message_id, inline_keyboard, message.text, sky_logo)
    //     }
    //   }
    // }
  }


  actualList.forEach(event => {
    if (event.commandMemberCount > 1 && event.type === "game") {

      //регистрация юзера
      obj[event.callData + "_user"] = {
        editRegistrationMenu: async (chatId, message_id) => {

          return await editMessages(chatId, message_id, userRegConfirm(event.callData), texts.userReg)

        }
      }


      obj[event.callData + "_comand"] = {
        editRegistrationMenu: async (chatId, message_id) => {

          const {type, count, commandName, members} = await getCommand(event.registrationSheets, chatId)
          if (type === "capitan") {

            const buttons = members.filter(member => {
              return member.registrationType === "user"
            }).map((member, index) => {
              const memberInfo = member.username ? member.username : member.telegramName
              const query = {
                id: member.chatId,
                conf: false,
                // memberInfo
              }
              return [{
                text: `${index + 1}. Произвести замену ${memberInfo}`,
                callback_data: `delete?${Object.keys(query).map(elem => {
                  return `${elem}=${query[elem]}`
                }).join("&")}#${event.callData}`
              }]
            })

            if(buttons.length ===0){
              const query = {
                id: chatId,
                conf: false
              }
              buttons.push([{
                text:"Расформировать команду?",
                callback_data:`delete?${Object.keys(query).map(elem => {
                  return `${elem}=${query[elem]}`
                }).join("&")}#${event.callData}`
              }])
            }

            console.log("кнопки"+buttons)
            const inline_keyboard = [
              ...buttons,
              [{
                text: "<<- Назад",
                callback_data: event.callData + "_capitan"
              }]
            ]
            return await editMessages(chatId, message_id, inline_keyboard, `В команду ${commandName}  зарегистрировалось ${count} членов команды, \n` +
              members.map((member, index) => {
                const memberInfo = member.username ? member.username : member.telegramName
                return `${index + 1}. ${memberInfo} ${member.registrationType === "capitan" ? "- Капитан" : "- член команды"}`
              }).join("\n"))
          } else {
            const message = inlineGameList(timeCheck(gamesList))
            const inline_keyboard = message.form.reply_markup.inline_keyboard

            return await editMessages(chatId, message_id, inline_keyboard, message.text, sky_logo)
          }
        }
      }


      //регистрация капитана
      obj[event.callData + "_capitan"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const command = await getCommand(event.registrationSheets, chatId)
          const {type, count, commandName, capitan} = command

          console.log(command)
          const regText = type === "noReg" ? "Зарегистрироваться" : "Изменить данные"
          if (type === "capitan") {
            console.log("capitan")
            const inline_keyboard = capitanTeam(count, commandName, event.callData, event.callData, event.webAppUrl, {
              regText,
              callData: event.callData,
              commandMemberCount: event.commandMemberCount,
              regType: "capitan",
              commandName
            })
            return await editMessages(chatId, message_id, inline_keyboard, `Уважаемый капитан команды ${commandName}, ` +
              `здесь вы можете посмотреть список членов команды и в случае необходимости произвести замену участника`)
          }


          if (type === "noReg") {
            console.log("noReg")
            const inline_keyboard = capitanRegConfirm({
              regText,
              callData: event.callData,
              commandMemberCount: event.commandMemberCount,
            }, event.gameName, event.callData, regText, event.webAppUrl, event.callData)

            return await editMessages(chatId, message_id, inline_keyboard, texts.capitanRegConf)
          }


          if (type === "user") {
            console.log("user")
            const capitaninfo = capitan.username ? capitan.username : capitan.telegramName
            const text = `Свяжитесь со своим капитаном (${capitaninfo}) для подробной информации`
            const inline_keyboard = [
              [{
                text: "<<- Назад",
                callback_data: event.callData
              }]
            ]
            return await editMessages(chatId, message_id, inline_keyboard, text)
          }


        }
      }

      //меню игры на больше 1
      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const inline_keyboard = bigTeam(event.gameName, "AllGameList", `${event.callData}`, event.callData,)
          return await editMessages(chatId, message_id, inline_keyboard, event.descriptions, event.imageUrl)

        }
      }

      //нет команды
      obj[event.callData + "_noComand"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const inline_keyboard = [[{
            text: "<<- Назад",
            callback_data: event.callData
          }]]
          const currentText = `Вы всегда можете найти себе боевых товарищей в комментариях под постом с анонсом мероприятия ${event.anoncedPost}`
          return await editMessages(chatId, message_id, inline_keyboard, currentText)

        }
      }
    }

    //reglament
    if (event.type === "game") {
      obj[`${event.callData}_reglament`] = {
        editRegistrationMenu: async (chatId, message_id) => {

          const inline_keyboard = [
            [{
              text: "<<- Назад",
              callback_data: event.callData
            }]
          ]

          return await editMessages(chatId, message_id, inline_keyboard, event.reglaments,)

        }
      }
    }

    if (event.commandMemberCount === 1 && event.type === "game") {

      //регистрация одиночных
      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {

          const {types} = getRegType(chatId, event.registrationSheets)
          const regText = types ? "Изменить данные" : "Зарегистрироваться"
          const regType = "user"
          const inline_keyboard = smallTeam(
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

          return await editMessages(chatId, message_id, inline_keyboard, event.descriptions, event.imageUrl)

        }
      }
    }
    //лотерея
    if (event.type === "lottery") {

      //начальное меню лотереи
      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const inline_keyboard = lottery(
            event.gameName,
            "AllGameList",
            event.callData,
            event.webAppUrl,
            {
              callData: event.callData,
            }
          )

          return await editMessages(chatId, message_id, inline_keyboard, event.descriptions, event.imageUrl)

        }
      }
      //регламент лотереи
      obj[`${event.callData}_reglament`] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const inline_keyboard = [
            [{
              text: "<<- Назад",
              callback_data: event.callData
            }]
          ]

          return await editMessages(chatId, message_id, inline_keyboard, event.reglaments)

        }
      }
    }
  })

  console.log(JSON.stringify(obj))
  return obj
}
