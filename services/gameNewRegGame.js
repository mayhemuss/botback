import {auth, googleSheets} from "../functions/googleAuth.js";
import {spreadsheetId} from "../tokens/token.js";
import {bot} from "../index.js";
import {texts} from "../text.js";
import {saveMessages} from "./saveMessages.js";
import {ADMIN_ID} from "../tokens/url.js";


export const gameNewRegGame = async (
  registrationSheets,
  date,
  phone,
  name,
  subscribe,
  tname,
  username,
  chatId,
  ip,
  ref,
  commandName,
  regType,
  games,
  userIds,
  callDataInGame,
  gameName,
  comName,
  count
) => {
  const responce = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`)
  const {city, region, country} = await responce.json()
  const Tusername = username ? "https://t.me/" + username : ""

  if (ref === "undefined") {
    await saveMessages("битая реф ссылка", chatId, "bot")
    await bot.sendMessage(chatId, "Произошла техническая ошибка, сейчас я свяжусь с вашим капитаном и мы ее исправим")
    return await bot.sendMessage(ADMIN_ID, "битая ссылка у " + chatId)
  }
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: registrationSheets+"!A:N",
    valueInputOption: "RAW",
    resource: {
      values: [[
        date, phone, name, subscribe, tname, Tusername,
        String(chatId), commandName,ref?  String(ref) : String(chatId), regType === "capitan"? "capitan": "user", ip, city, region, country
      ]],
    }
  })
  console.log("new")

  if (games[0].commandMemberCount > 1 && regType === "capitan") {

    await bot.sendMessage(chatId, texts.capitanRegDone(name, commandName, games[0].commandMemberCount))
    await bot.sendMessage(chatId, texts.refUrl(chatId, callDataInGame, commandName, gameName))
    await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`, chatId, "bot")
    await saveMessages(`Спасибо за регистрацию, ${name}. реферальная ссылка ${texts.refUrl(chatId, callDataInGame, commandName, gameName)}`, chatId, "bot")
  }
  if (games[0].commandMemberCount > 1 && regType === "user") {
    await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
    await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`, chatId, "bot")
  }

  if (games[0].commandMemberCount === count + 1 && games[0].commandMemberCount > 1) {
    for (const id of [...userIds, chatId]) {
      await bot.sendMessage(id, texts.registrationDone(comName, games[0].gameName))
      await saveMessages(`Спасибо за регистрацию команды ${comName}.`, id, "bot")
    }
  }

  if (games[0].commandMemberCount === 1) {
    await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
    await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`, chatId, "bot")
  }

}
