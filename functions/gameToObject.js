import {gamesList} from "../games/gamesList.js";
import {
  bigTeam,
  capitanRegConfirm,
  capitanTeam,
  lottery, mixRegMenu,
  mixTeam,
  sky_logo,
  smallTeam,
  texts,
  userRegConfirm
} from "../text.js";
import {timeCheck} from "./timeCheck.js";
import {editMessages} from "./editMessages.js";
import UserRegService from "../services/UserRegService.js";
import DisciplineService from "../services/DisciplineService.js";
import {telegramUrlCheck} from "./telegramUrlCheck.js";
import {rawQueryToString} from "./rawQueryToString.js";
import {inlineGameList} from "./startMessage.js";

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
        const inline_keyboard = [[{text: "Ожидаем анонс мероприятий", callback_data: "AllGameList"}],]
        return await editMessages(chatId, message_id, inline_keyboard, texts.AwaitText, sky_logo)

      }
    },
  }


  actualList.forEach(event => {

    obj[event.callData + "_problems"] = {
      editRegistrationMenu: async (chatId, message_id) => {
        const inline_keyboard = [
          [{text: "<<- Назад", callback_data: event.callData}]
        ]

        const text = "Если у вас возникли проблемы с входом в мини приложение с регистрацией, " +
          "то скорей всего они связаны с отключенными скриптами в приложении Telegram. Поробуйте " +
          "открыть бота через [WEB версию телеграм](https://web.telegram.org/)\n\n" +
          "Если это не помогло напишите нам в [техническую поддержку](https://t.me/Sitnikov_vla)"

        return await editMessages(chatId, message_id, inline_keyboard, text)
      }
    }

    if (event.commandMemberCount > 1 && event.type === "game") {

      //регистрация миксов
      obj[event.callData + "_mix"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const discipline = await DisciplineService.get(event.callData)
          const user = discipline ? await UserRegService.getUser(discipline.id, chatId) : null
          return await editMessages(
            chatId,
            message_id,
            mixRegMenu({
              ref: -1,
              callData: event.callData
            }, user ? "Изменить данные" : "Зарегистрироваться", event.webAppUrl, event.callData),
            "Если у вас нет команды, вы можете зарегистрироваться Solo игроком, мы с радостью поможем собрать вам Dream-Team."
          )
        }
      }

      //регистрация юзера
      obj[event.callData + "_user"] = {
        editRegistrationMenu: async (chatId, message_id) => {

          return await editMessages(chatId, message_id, userRegConfirm(event.callData), texts.userReg)
        }
      }


      obj[event.callData + "_comand"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const disciplineId = await DisciplineService.createOrGet(event.callData, event.gameName, event.type, event.dateEnd)
          const user = await UserRegService.getUser(disciplineId, chatId)


          // const {type, count, commandName, members} = await getCommand(event.registrationSheets, chatId)
          if (user.registrationType === "capitan") {
            const members = await UserRegService.getCommand(disciplineId, user.ref)
            const count = members?.length
            const commandName = members[0]?.commandName

            const buttons = members.filter(member => {
              return member.registrationType === "user"
            }).map((member, index) => {
              const memberInfo = member.userName ? member.userName.split("t.me/")[1] : member.telegramName
              const query = {
                id: member.chatId, conf: false, // memberInfo
              }
              return [{
                text: `${index + 1}. Произвести замену ${memberInfo}`,
                callback_data: `delete?${Object.keys(query).map(elem => {
                  return `${elem}=${query[elem]}`
                }).join("&")}#${event.callData}`
              }]
            })

            if (buttons.length === 0) {
              const query = {
                id: chatId, conf: false
              }
              buttons.push([{
                text: "Расформировать команду?", callback_data: `delete?${Object.keys(query).map(elem => {
                  return `${elem}=${query[elem]}`
                }).join("&")}#${event.callData}`
              }])
            }

            const inline_keyboard = [...buttons, [{
              text: "<<- Назад", callback_data: event.callData + "_capitan"
            }]]
            return await editMessages(chatId, message_id, inline_keyboard, `В команду ${commandName}  зарегистрировалось ${count} членов команды, \n` + members.map((member, index) => {
              const memberInfo = member.userName ? `[${member.telegramName}](${member.userName})` : member.telegramName
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

          const disciplineId = await DisciplineService.createOrGet(event.callData, event.gameName, event.type, event.dateEnd)
          const user = await UserRegService.getUser(disciplineId, chatId)
          const type = user?.registrationType
          const ref = user?.ref
          console.log(user)


          if (ref === -1 || ref === "-1") {
            const text = "Вы уже были зарегистрированы в MiX режиме."

            const inline_keyboard = [
              [{
                text: "удалить регистрацию?", callback_data: `delete?id=${chatId}&type=mix&conf=false#${event.callData}`
              }],
              [{
                text: "<<- Назад", callback_data: event.callData
              }]
            ]
            return await editMessages(chatId, message_id, inline_keyboard, text)
          }


          // console.log(command)
          const regText = type === "noReg" || type === undefined ? "Зарегистрироваться" : "Изменить данные"
          if (type === "capitan") {
            const members = await UserRegService.getCommand(disciplineId, user.ref)
            const count = members?.length
            const commandName = members[0]?.commandName

            const inline_keyboard = capitanTeam(count, commandName, event.callData, event.callData, event.webAppUrl, {
              ref: chatId,
              callData: event.callData,

            })
            return await editMessages(chatId, message_id, inline_keyboard, `Уважаемый капитан команды ${commandName}, ` + `здесь вы можете посмотреть список членов команды и в случае необходимости произвести замену участника`)
          }


          if (type === "noReg" || type === undefined) {
            const inline_keyboard = capitanRegConfirm({
              callData: event.callData, ref: chatId
            }, event.gameName, event.callData, regText, event.webAppUrl, event.callData)

            return await editMessages(chatId, message_id, inline_keyboard, texts.capitanRegConf)
          }

          if (type === "user") {
            const members = await UserRegService.getCommand(disciplineId, user.ref)
            const capitan = members.filter(member => {
              return member.registrationType === "capitan"
            })[0]

            const capitaninfo = capitan.userName ? capitan.userName : capitan.telegramName
            const text = `Свяжитесь со своим капитаном (${capitaninfo}) для подробной информации`
            const inline_keyboard = [[{
              text: "<<- Назад", callback_data: event.callData
            }]]
            return await editMessages(chatId, message_id, inline_keyboard, text);
          }
        }
      }

      //меню игры на больше 1
      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          await DisciplineService.createOrGet(event.callData, event.gameName, event.type, event.dateEnd)
          const inline_keyboard = bigTeam(event.gameName, "AllGameList", `${event.callData}`, event.callData, event.haveMix)
          return await editMessages(chatId, message_id, inline_keyboard, event.descriptions, event.imageUrl)

        }
      }

      //нет команды
      obj[event.callData + "_noComand"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const inline_keyboard = [[{
            text: "<<- Назад", callback_data: event.callData
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

          const inline_keyboard = [[{
            text: "<<- Назад", callback_data: event.callData
          }]]

          return await editMessages(chatId, message_id, inline_keyboard, event.reglaments,)

        }
      }
    }

    if (event.commandMemberCount === 1 && event.type === "game") {

      //регистрация одиночных
      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const disciplineId = await DisciplineService.createOrGet(event.callData, event.gameName, event.type, event.dateEnd)
          const user = await UserRegService.getUser(disciplineId, chatId)


          const regText = user ? "Изменить данные" : "Зарегистрироваться"

          const inline_keyboard = smallTeam(event.gameName, "AllGameList", regText, {
            callData: event.callData, ref: chatId,
          }, event.webAppUrl, event.callData)

          return await editMessages(chatId, message_id, inline_keyboard, event.descriptions, event.imageUrl)

        }
      }
    }
    //лотерея
    if (event.type === "lottery") {

      //начальное меню лотереи
      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const inline_keyboard = await lottery(event.gameName, "AllGameList", event.callData, event.webAppUrl, {
            callData: event.callData, ref: chatId
          }, chatId)

          return await editMessages(chatId, message_id, inline_keyboard, event.descriptions, event.imageUrl)

        }
      }
      //регламент лотереи
      obj[`${event.callData}_reglament`] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const inline_keyboard = [[{
            text: "<<- Назад", callback_data: event.callData
          }]]

          return await editMessages(chatId, message_id, inline_keyboard, event.reglaments)

        }
      }
    }

    if (event.type === "mix") {

      obj[event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          await DisciplineService.createOrGet(event.callData, event.gameName, event.type, event.dateEnd)
          const nick = await telegramUrlCheck(chatId)
          const inline_keyboard = mixTeam(event.gameName, "AllGameList", event.callData, nick)
          return await editMessages(chatId, message_id, inline_keyboard, texts.mixMenu, event.imageUrl)
        }
      }

      obj[event.callData + "_reglament"] = {
        editRegistrationMenu: async (chatId, message_id) => {

          const inline_keyboard = [[{
            text: "<<- Назад",
            callback_data: event.callData
          }]]
          return await editMessages(chatId, message_id, inline_keyboard, event.reglaments)
        }
      }


      obj[event.callData + "_regconf"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const inline_keyboard = [
            [{
              text: "✅ Подтвердить",
              callback_data: event.callData + "_regpage"
            },
              {
                text: "❌ Назад",
                callback_data: event.callData
              }]
          ]


          return await editMessages(chatId, message_id, inline_keyboard, 'У вас нету ника в телеграме, для общения с будущим капитаном членом команды' +
            'мы будем вынуждены передать ваш номер телефона, либо в настройках телеграма сделайте ник и перезапустите бота')
        }
      }

      obj[event.callData + "_regpage"] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const query = rawQueryToString({ref: chatId, callData: event.callData})
          const inline_keyboard = [
            [{
              text: "Зарегистрироваться",
              web_app: {
                url: `${event.webAppUrl}?${query}`
              }
            }],
            [{
              text: "<<- Назад",
              callback_data: event.callData
            }]
          ]
          return await editMessages(chatId, message_id, inline_keyboard, 'страница регистрации на турнир')
        }
      }


    }
  })

  return obj
}
