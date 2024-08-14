
import {searchGameText} from "../text.js";
import {bot} from "../index.js";
import {saveMessages} from "../services/saveMessages.js";


export const swearWords = async (chatId) => {
  await saveMessages(searchGameText.swear_words, chatId, "bot")
  await bot.sendMessage(chatId, searchGameText.swear_words)
}
