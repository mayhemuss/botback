import {gameVariantsText} from "../text.js";
import {gamesCs, gamesDota, gamesMlbb, gamesValorant, nothingGames} from "./otherGames.js";
import {textCheck} from "../functions/textCheck.js";
import {timeCheck} from "../functions/timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import {startMessage} from "../functions/startMessage.js";
import {bot} from "../index.js";


export const textCommandCheck = async (text, chatId, messageToSave) => {

  const anoncedGames = timeCheck(gamesList)


  if (anoncedGames.length > 0) {
    for (let game of anoncedGames) {
      if (text && textCheck(text, gameVariantsText[game.anonced])) {
        await bot.sendMessage(chatId, "Мероприятие уже анонсировано, пройдите регистрацию")
        return await startMessage(chatId)
      }
    }
  }

  if (text && textCheck(text, gameVariantsText.valorant)) {
    return gamesValorant(chatId)
  }
  if (text && textCheck(text, gameVariantsText.dota)) {
    return gamesDota(chatId)
  }
  if (text && textCheck(text, gameVariantsText.mlbb)) {
    return gamesMlbb(chatId)
  }
  if (text && textCheck(text, gameVariantsText.cs)) {
    return gamesCs(chatId)
  }
//не опознанный текст
  return nothingGames(chatId)
}

