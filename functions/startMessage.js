import {inlineGameList} from "../games/inlineGameList.js";
import {timeCheck} from "./timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import {bot} from "../index.js";
import {sky_logo} from "../text.js";

export const startMessage = async (chatId) => {
  // const reg = await getRegType(googleSheets, auth, spreadsheetId, chatId)
  // const regText = "Зарегистрироваться"

  const message = inlineGameList(timeCheck(gamesList))

  await bot.sendPhoto(chatId, sky_logo)
  return await bot.sendMessage(chatId, message.text, message.form);
}
