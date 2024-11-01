import {gameVariantsText} from "../text.js";
import {gamesCs, gamesDota, gamesMlbb, gamesValorant, nothingGames} from "./otherGames.js";
import {textCheck} from "../functions/textCheck.js";
import {timeCheck} from "../functions/timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import {startMessage} from "../functions/startMessage.js";
import {bot} from "../index.js";
import {saveMessages} from "../services/saveMessages.js";


export const textCommandCheck = async (text, chatId, messageToSave) => {

  const anoncedGames = timeCheck(gamesList)
  try {
    if (anoncedGames.length > 0) {
      for (let game of anoncedGames) {
        if (text && textCheck(text, gameVariantsText[game.anonced])) {
          await bot.sendMessage(chatId, "Мероприятие уже анонсировано, пройдите регистрацию")
           await startMessage(chatId)
          return  await  saveMessages(JSON.stringify(
            {
              ...messageToSave,
              answer: "Мероприятие уже анонсировано, пройдите регистрацию"
            }
          ), chatId)
        }
      }
    }
  } catch (e) {
  }
  console.log(anoncedGames)


  if (text && textCheck(text, gameVariantsText.valorant)) {
    await gamesValorant(chatId)
    return  await  saveMessages(JSON.stringify(
      {
        ...messageToSave,
        answer: "скоро будет"
      }
    ), chatId)
  }
  if (text && textCheck(text, gameVariantsText.dota)) {
    await gamesDota(chatId)
    return  await  saveMessages(JSON.stringify(
      {
        ...messageToSave,
        answer: "скоро будет"
      }
    ), chatId)
  }
  if (text && textCheck(text, gameVariantsText.mlbb)) {
    await gamesMlbb(chatId)
    return  await  saveMessages(JSON.stringify(
      {
        ...messageToSave,
        answer: "скоро будет"
      }
    ), chatId)
  }
  if (text && textCheck(text, gameVariantsText.cs)) {
    await gamesCs(chatId)
    return  await  saveMessages(JSON.stringify(
      {
        ...messageToSave,
        answer: "скоро будет"
      }
    ), chatId)
  }
//не опознанный текст
  await nothingGames(chatId)
  return  await  saveMessages(JSON.stringify(
    {
      ...messageToSave,
      answer: "непонятный текст"
    }
  ), chatId)
}

