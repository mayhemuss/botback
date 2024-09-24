import {bot} from "../index.js";
import {texts} from "../text.js";
import {saveMessages} from "./saveMessages.js";
import {ADMIN_ID} from "../tokens/url.js";
import {getDataFromExel, saveDataToExel} from "./exelData.js";


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
  //получение региона по ip
  const responce = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`)
  const {city, region, country} = await responce.json()

  const Tusername = username ? "https://t.me/" + username : ""

  //битая реф ссылка
  if (ref === "undefined" && games[0].commandMemberCount > 1) {
    await saveMessages("битая реф ссылка", chatId, "bot")
    await bot.sendMessage(chatId, "Произошла техническая ошибка, сейчас я свяжусь с вашим капитаном и мы ее исправим")
    return await bot.sendMessage(ADMIN_ID, "битая ссылка у " + chatId)
  }

  //получение команды
  const allRow = await getDataFromExel(registrationSheets)
  const currentCommand = allRow.filter(row => {
    return +row.ref === +ref
  })

  //если команды нет и ты не капитан
  if (currentCommand.length === 0 && regType !== "capitan" && games[0].commandMemberCount > 1) {
    await bot.sendMessage(chatId, "Капитан команды расформировал команду")
    return await saveMessages(`Капитан команды расформировал команду`, chatId, "bot")
  }

  //когда команда уже набрана
  if (currentCommand.length >= games[0].commandMemberCount) {

    return await bot.sendMessage(chatId, "Команда уже набрана")

  }

  //запись в гугл если либо ты капитан, либо есть команда
  await saveDataToExel(date,
    phone,
    name,
    subscribe,
    tname,
    Tusername,
    String(chatId),
    commandName,
    ref ? String(ref) : String(chatId),
    regType === "capitan" ? "capitan" : "user",
    ip,
    city,
    region,
    country,
    registrationSheets)

  console.log("new")

  //если игра на больше одного и регнулся капитан
  if (games[0].commandMemberCount > 1 && regType === "capitan") {
    await bot.sendMessage(chatId, texts.capitanRegDone(name, commandName, games[0].commandMemberCount))
    await bot.sendMessage(chatId, texts.refUrl(chatId, callDataInGame, commandName, gameName))

    await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`+`Спасибо за регистрацию, ${name}. реферальная ссылка ${texts.refUrl(chatId, callDataInGame, commandName, gameName)}`, chatId, "bot")
  }

  //если регается не капитан в игру на больше 1
  if (games[0].commandMemberCount > 1 && regType !== "capitan") {
    await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
    await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`, chatId, "bot")
  }

  //если регнулся последний из команды на больше 1
  if (games[0].commandMemberCount === count + 1 && games[0].commandMemberCount > 1) {
    //отправляем поздравляшки всем
    for (const id of [...userIds, chatId]) {
      try {
        await bot.sendMessage(id, texts.registrationDone(comName, games[0].gameName))
      } catch (e) {
        console.log(e)
      }
    }
    await saveMessages(`Спасибо за регистрацию команды ${comName}. id= ${[...userIds, chatId].join("; ")}`, chatId, "bot")
  }

  //просто регаем одиночные игры
  if (games[0].commandMemberCount === 1) {
    await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
    await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`, chatId, "bot")
  }

}
