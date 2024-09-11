import {searchGameText} from "../text.js";
import {bot} from "../index.js";


export const swearWords = async (chatId) => {
  await bot.sendMessage(chatId, searchGameText.swear_words)
}
