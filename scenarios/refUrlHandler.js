import {decodeText} from "../functions/codeDecode.js";
import {bot} from "../index.js";
import {ADMIN_ID} from "../tokens/url.js";
import {saveMessages} from "../services/saveMessages.js";
import {timeCheck} from "../functions/timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import DisciplineService from "../services/DisciplineService.js";
import UserRegService from "../services/UserRegService.js";
import {refGameHandler} from "./refGameHandler.js";
import {refLotteryHandler} from "./refLotteryHandler.js";

export const refUrlHandler = async (chatId, text, messageToSave) => {

  const codedText = text.split(" ")[1]

  const decodedText = decodeText(codedText)

  messageToSave.codedText = codedText;
  messageToSave.decodedText = decodedText

  const [capId, anonced, dateEnd] = decodedText.split("_")

  if (dateEnd.length < 13) {
    await bot.sendMessage(chatId, "Не полная реферальная ссылка, попросите капитана команды преслать вам все сообщение с реферальной ссылкой")
    await bot.sendMessage(ADMIN_ID, `Не полная реферальная ссылка ${decodedText} у ${chatId}`)
    return await saveMessages(JSON
      .stringify({...messageToSave, answer: "не полная"}), chatId, "bot")
  }

  if (capId === "undefined") {
    await bot.sendMessage(chatId, "Произошла техническая ошибка, сейчас я свяжусь с вашим капитаном и мы ее исправим")
    await bot.sendMessage(ADMIN_ID, `Битая реферальная ссылка ${decodedText} у ${chatId}`)
    return await saveMessages(JSON
      .stringify({...messageToSave, answer: "битая реф ссылка"}), chatId, "bot")
  }

  const callData = `${anonced}_${dateEnd}`

  const games = timeCheck(gamesList).filter(game => {
    return game.callData === callData
  })

  //эта игра не активна
  if (games.length === 0) {
    await bot.sendMessage(chatId, "Регистрация на мероприятие была завершена")
    messageToSave.answer = "Регистрация на мероприятие была завершена"
    return await saveMessages(JSON.stringify(messageToSave), chatId)
  }

  const game = games[0]
  const {type, gameName} = game

  //сам себе реферал
  if (+capId === +chatId) {

    if (type === "game") {
      await bot.sendMessage(chatId, "Вы уже зарегистрировались как Капитан команды")
      messageToSave.answer = "Вы уже зарегистрировались как Капитан команды"
    }
    if (type === "lottery") {
      await bot.sendMessage(chatId, "Вы не может быть своим рефералом 🤣")
      messageToSave.answer = "Вы не может быть своим рефералом"
    }

    //не сам себе реферал
  } else {

    const disciplineId = await DisciplineService.createOrGet(callData, gameName, type, dateEnd)
    const command = await UserRegService.getCommand(disciplineId, capId)

    if (type === "game") {
      return await refGameHandler(chatId, capId, game, command, messageToSave)
    }
    if (type === "lottery") {
      return await refLotteryHandler(chatId, capId, game, command, messageToSave)
    }
  }

  return await saveMessages(JSON.stringify(messageToSave), chatId)
}
