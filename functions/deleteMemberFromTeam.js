import {timeCheck} from "./timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import {bot} from "../index.js";
import {saveMessages} from "../services/saveMessages.js";
import {editMessages} from "./editMessages.js";
import DisciplineService from "../services/DisciplineService.js";
import UserRegService from "../services/UserRegService.js";

export const deleteMemberFromTeam = async (callBackData, gameObj, chatId, message_id, messageToSave) => {
  const [query, callData] = callBackData.split("#")

  const actualgame = timeCheck(gamesList).filter(game => {
    return game.callData === callData
  })[0];

  //проверка на то что игра еще анонсирована
  if (Object.keys(gameObj).includes(callData)) {

    //инициализируем и получаем параметры запроса
    const params = {}
    query.split("?")[1].split("&").forEach(oneParam => {
      const [name, param] = oneParam.split("=")
      params[name] = param
    })

    messageToSave.deleteParams = params

    const disciplineId = await DisciplineService.createOrGet(callData, actualgame.gameName, actualgame.type, actualgame.dateEnd)

    if (params.type === "mix" && params.conf === "false") {
      // const memberInfo = deletedMember.username ? deletedMember.username : deletedMember.telegramName

      const quer = {
        id: +params.id,
        conf: true,
        type: "mix"
      }

      const inline_keyboard = [[
        {
          text: "✅ Подтвердить",
          callback_data: `delete?${Object.keys(quer).map(elem => {
            return `${elem}=${quer[elem]}`
          }).join("&")}#${callData}`
        },
        {
          text: "❌ Отменить",
          callback_data: callData + "_comand"
        }
      ]]

      //отправка кнопок подтверждения
      return await editMessages(chatId, message_id, inline_keyboard, `Подтвердить удаление регистрации с MiX режима`)
    }


    if (params.type === "mix" && params.conf === "true") {
      console.log("mixdeletetrue")
      await UserRegService.deleteUserReg(disciplineId, params.id)
      await gameObj[callData].editRegistrationMenu(chatId, message_id)
      await bot.sendMessage(chatId, "Вы удалили регистрацию с MiX режима и можете зарегистрироваться либо как член команды, либо как капитан")
      return await saveMessages(JSON.stringify({...messageToSave, answer: `удалился с микс режима`}))
    }


    const currentComand = await UserRegService.getCommand(disciplineId, chatId)
    if (currentComand.length === 0) {
      return
    }


    const initiator = currentComand.filter(member => {
      return +member.chatId === chatId
    })[0]


    //подтверждение удаления
    if (params.conf === "true") {


      //если инициатор капитан
      if (initiator.registrationType === "capitan") {


        //если удаляет себя
        if (+params.id === +chatId) {

          if (currentComand.length > 1) {
            return await bot.sendMessage(chatId, "Команда не пуста")
          }
          await UserRegService.deleteUserReg(disciplineId, params.id)
          await gameObj[callData].editRegistrationMenu(chatId, message_id)
          await bot.sendMessage(chatId, "Команда успешно расформирована")
          return await saveMessages(JSON.stringify({...messageToSave, answer: `расформировал команду`}))

          //если удаляет члена команды
        } else {
          await UserRegService.deleteUserReg(disciplineId, params.id)

          await gameObj[callData + "_comand"].editRegistrationMenu(chatId, message_id)
          await bot.sendMessage(params.id, "Капитан команды удалил вас из команды")
          return bot.sendMessage(chatId, "Участник успешно удален из команды")
        }

        //если не капитан, то ошибка (не должен будет отрабатывать никогда)
      } else {

        await gameObj.AwaitNew.editRegistrationMenu(chatId, message_id)
        return await saveMessages(JSON
          .stringify({...messageToSave, answer: "не капитан пытается удалить участника"}), chatId,)
      }


      //согласование удаления
    } else {


      // если пытается удалить капитана и команду
      if (+params.id === +chatId) {


        //если в команде не только капитан
        if (currentComand.length !== 1) {
          await gameObj[callData + "_comand"].editRegistrationMenu(chatId, message_id)
          return await bot.sendMessage(chatId, "Команда не пуста")
        }
      }

      //создание кнопок подтверждения
      const deletedMember = currentComand.filter(member => {
        return +params.id === +member.chatId
      })[0]

      const memberInfo = deletedMember.username ? deletedMember.username : deletedMember.telegramName

      const quer = {
        id: +params.id,
        conf: true,

      }

      const inline_keyboard = [[
        {
          text: "✅ Подтвердить",
          callback_data: `delete?${Object.keys(quer).map(elem => {
            return `${elem}=${quer[elem]}`
          }).join("&")}#${callData}`
        },
        {
          text: "❌ Отменить",
          callback_data: callData + "_comand"
        }
      ]]

      //отправка кнопок подтверждения
      return await editMessages(chatId, message_id, inline_keyboard, `Подтвердить удаление члена команды ${memberInfo}?`)
    }

    //игра не анонсирована
  } else {
    await gameObj.AllGameList.editRegistrationMenu(chatId, message_id)
    return await saveMessages(JSON
      .stringify({...messageToSave, answer: "ожидаем новых мероприятий"}), chatId,)
  }
}
