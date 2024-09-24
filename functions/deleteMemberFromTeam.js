import {timeCheck} from "./timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import {deleteDatainExel, getDataFromExel} from "../services/exelData.js";
import {bot} from "../index.js";
import {saveMessages} from "../services/saveMessages.js";
import {editMessages} from "./editMessages.js";

export const deleteMemberFromTeam = async (callBackData, gameObj, chatId, message_id, messageToSave) => {
  const [query, callData] = callBackData.split("#")

  //проверка на то что игра еще анонсирована
  if (Object.keys(gameObj).includes(callData)) {

    //инициализируем и получаем параметры запроса
    const params = {}
    query.split("?")[1].split("&").forEach(oneParam => {
      const [name, param] = oneParam.split("=")
      params[name] = param
    })

    messageToSave.deleteParams = params

    //получение ид таблицы
    const registrationSheets = timeCheck(gamesList).filter(game => {
      return game.callData === callData
    })[0].registrationSheets

    //получение всех регистраций
    const allRow = await getDataFromExel(registrationSheets)

    //получение инициатора удаления
    const member = allRow.filter(row => {
      return +row.chatId === +chatId
    })[0]

    messageToSave.deleteMember = member

    //подтверждение удаления
    if (params.conf === "true") {


      //если инициатор капитан
      if (member.registrationType === "capitan") {

        //поиск строки с удаляемым
        const index = allRow.findIndex(row => {
          return row.chatId === params.id
        })


        //если удаляет себя
        if (+params.id === +chatId) {
          await deleteDatainExel(registrationSheets, index)
          await gameObj[callData].editRegistrationMenu(chatId, message_id)
          await bot.sendMessage(chatId, "Команда успешно расформирована")
          return await saveMessages(JSON.stringify({...messageToSave, answer:`расформировал команду`}))

          //если удаляет члена команды
        } else {

          await deleteDatainExel(registrationSheets, index)
          await gameObj[callData + "_comand"].editRegistrationMenu(chatId, message_id)
          await bot.sendMessage(params.id, "Капитан команды удалил вас из команды")
          return bot.sendMessage(chatId, "Участник успешно удален из команды")
        }

        //если не капитан, то ошибка (не должен будет отрабатывать никогда)
      } else {

        await gameObj.AwaitNew.editRegistrationMenu(chatId, message_id)
        return await saveMessages(JSON
          .stringify({...messageToSave, answer: "ожидаем новых мероприятий"}), chatId,)
      }


      //согласование удаления
    } else {
      //получение списка команды
      const currentComand = allRow.filter(row => {
        return +row.ref === +chatId
      })

      // если пытается удалить капитана и команду
      if (+params.id === +chatId) {


        //если в команде не только капитан
        if (currentComand.length !== 1) {
          await gameObj[callData + "_comand"].editRegistrationMenu(chatId, message_id)
          return await bot.sendMessage(chatId, "Команда не пуста")
        }
      }

      //создание кнопок подтверждения
      const memberInfo = member.username ? member.username : member.telegramName

      const quer = {
        id: params.id,
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
