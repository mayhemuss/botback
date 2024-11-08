import {bot} from "../index.js";

export const telegramUrlCheck = async (chatId) => {
  const member = await bot.getChat(chatId)
   return !!member.username;
}