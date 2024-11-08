import {saveMessages} from "../services/saveMessages.js";
import {timeCheck} from "../functions/timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import {bot} from "../index.js";
import DisciplineService from "../services/DisciplineService.js";
import {getIpData} from "../functions/getIpData.js";
import UserRegService from "../services/UserRegService.js";
import {ADMIN_ID} from "../tokens/url.js";
import {registrationGame} from "../scenarios/registrationGame.js";
import {registrationLottery} from "../scenarios/registrationLottery.js";
import {registrationSingleGame} from "./registrationSingleGame.js";

export const getRegistration = async (req, res) => {

  const {chatId, ref, callData, ip,} = req.body;


  try {
    //битая ссылка
    if (ref === "undefined") {
      await saveMessages("битая реф ссылка", chatId, "bot")
      await bot.sendMessage(chatId, "Произошла техническая ошибка, данная реферальная ссылка не работает.")
      return await bot.sendMessage(ADMIN_ID, "битая ссылка у " + chatId)
    }

    //список игр
    const games = timeCheck(gamesList).filter(game => {
      return game.callData === callData
    });

    const game = games[0]

    //игра
    const {type, gameName} = game

    //нет игр
    if (games.length === 0) {
      res.json({message: "done"})
      await bot.sendMessage(chatId, "Регистрация на мероприятие уже была окончена")
      return await res.json({done: "done"})
    }

    const disciplineId = await DisciplineService.createOrGet(callData, gameName)

    const ipData = await getIpData(ip)

    const user = await UserRegService.getUser(disciplineId, chatId)

    //регистрация на игры
    if (type === "game") {
      await registrationGame(chatId, user, disciplineId, ipData, ref, req.body, game, ip)
    }
    if (type === "lottery") {
      await registrationLottery(chatId, user, disciplineId, ipData, ref, req.body, game, ip)
    }
    if (type === "mix") {
      await registrationSingleGame(chatId, user, disciplineId, ipData, ref, req.body, game, ip)
    }

    return await res.json({done: "done"})

  } catch (e) {
    console.log(e)
    await bot.sendMessage(ADMIN_ID, chatId + JSON.stringify(e))
    res.status(400).json(e)
    return await saveMessages(JSON.stringify({e, chatId}), chatId, "bot")
  }
}