import {searchGameText} from "../text.js";
import {bot} from "../index.js";
import {saveMessages} from "../services/saveMessages.js";
import {startMessage} from "../functions/startMessage.js";

export const gamesValorant = async (chatId) => {
  await saveMessages(searchGameText.valorant, chatId, "bot")
  await bot.sendMessage(chatId, searchGameText.valorant)
}
export const anoncedGames = async (chatId) => {

  await startMessage(chatId)
}

export const gamesDota = async (chatId) => {
  await saveMessages(searchGameText.dota, chatId, "bot")
  await bot.sendMessage(chatId, searchGameText.dota)
}

export const gamesMlbb = async (chatId) => {
  await saveMessages(searchGameText.mlbb, chatId, "bot")
  await bot.sendMessage(chatId, searchGameText.mlbb)
}

export const gamesCs = async (chatId) => {
  await saveMessages(searchGameText.cs, chatId, "bot")
  await bot.sendMessage(chatId, searchGameText.cs)
}

export const nothingGames = async (chatId)=>{
  await saveMessages(searchGameText.searchNothingText, chatId, "bot")
   await bot.sendMessage(chatId, searchGameText.searchNothingText)
}


