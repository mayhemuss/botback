import Router from "express";
import {spreadsheetId} from "./tokens/token.js";
import {auth, googleSheets} from "./functions/googleAuth.js";
import {saveMessages} from "./services/saveMessages.js";
import {getRegType} from "./services/getRegType.js";
import {gamesList} from "./games/gamesList.js";
import {bot} from "./index.js";
import {texts} from "./text.js";
import {timeCheck} from "./functions/timeCheck.js";
import {ADMIN_ID} from "./tokens/url.js";


const router = new Router();

router.get("/type", async (req, res) => {
  try {

    console.log("fet")
    const {id} = req.query;
    await saveMessages("открыл страницу регистрации", id)

    return await res.json({types: "done"})
  } catch (e) {
    console.log(e)
    return res.json(e);
  }
})

router.post("/regis",
  async (req, res) => {
    const {
      date,
      phone,
      name,
      subscribe,
      chatId,
      tname,
      username,
      regType,
      ref,
      callData,
      commandName,
      ip
    } = req.body;

    try {


      // console.log(req.body)
      // await saveMessages(`отправил данные, телефон - ${phone}, имя - ${name}`, chatId)
      const [anonced, dateEnd] = await callData.split("_")

      const games = timeCheck(gamesList).filter(game => {
        return game.anonced === anonced && game.callData
      })
      if (games.length === 0) {
        res.json({message: "done"})
        return bot.sendMessage(chatId, "Регистрация на мероприятие уже была окончена")
      }
      const {registrationSheets, gameName, callData: callDataInGame} = games[0]
      console.log(registrationSheets)
      const {
        index,
        commandName: comName,
        userIds,
        count
      } = await getRegType(chatId, registrationSheets, ref)


      if (index !== -1) {
        const NewInd = index + 1
        await googleSheets.spreadsheets.values.update({
          auth,
          spreadsheetId,
          range: `${registrationSheets}!A${NewInd}:K${NewInd}`,
          valueInputOption: "RAW",
          resource: {
            values: [[date, phone, name, subscribe, tname, username, String(chatId)]],
          }
        });
        console.log("renew")
        await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
        await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`, chatId, "bot")
      } else {
        const responce = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`)
        const {city, region, country} = await responce.json()

        await googleSheets.spreadsheets.values.append({
          auth,
          spreadsheetId,
          range: registrationSheets,
          valueInputOption: "RAW",
          resource: {
            values: [[date, phone, name, subscribe, tname, username, String(chatId), ref, commandName, regType, ip, city, region, country]],
          }
        })
        console.log("new")

        if (games[0].commandMemberCount > 1 && regType === "capitan") {

          await bot.sendMessage(chatId, texts.capitanRegDone(name, commandName, games[0].commandMemberCount))
          await bot.sendMessage(chatId, texts.refUrl(ref, callDataInGame, commandName, gameName))
          await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`, chatId, "bot")
          await saveMessages(`Спасибо за регистрацию, ${name}. реферальная ссылка ${texts.refUrl(ref, callDataInGame, commandName, gameName)}`, chatId, "bot")
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

      return await res.json({done: "done"})
    } catch (e) {
      // console.log(e)
      await bot.sendMessage(ADMIN_ID, JSON.stringify({e, chatId}))
      res.status(400).json(e)
      return await saveMessages(JSON.stringify({e, chatId}), chatId, "bot")
    }
  })


export default router;
