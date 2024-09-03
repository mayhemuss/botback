import {getRegType} from "./getRegType.js";
import {auth, googleSheets} from "../functions/googleAuth.js";
import {spreadsheetId} from "../tokens/token.js";
import {bot} from "../index.js";
import {saveMessages} from "./saveMessages.js";
import {texts} from "../text.js";

export const lotteryReg = async (
  ip, chatId, registrationSheets, ref,
  username, date, phone, name, subscribe,
  tname, steamName, commandMemberCount, callDataInGame, lotterySheets) => {

  const responce = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`)
  const {city, region, country} = await responce.json()

  if (region === "Санкт-Петербург" || city === "Санкт-Петербург") {

    const {
      index, count
    } = await getRegType(chatId, registrationSheets, ref, "имя в стиме")

    //изменение данных
    if (index !== -1) {
      const Tusername = username ? "https://t.me/" + username : ""
      const NewInd = index + 1
      await googleSheets.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: `${registrationSheets}!A${NewInd}:K${NewInd}`,
        valueInputOption: "RAW",
        resource: {
          values: [[
            date, phone, name, subscribe, tname,
            Tusername, String(chatId), steamName
          ]],
        }
      });
      await bot.sendMessage(chatId, `Спасибо за изменение данных ${name}`)

      //новая регистрация
    } else {

      //набор подпивасов окончен
      if (commandMemberCount === count) {
        await saveMessages(texts.lotteryTeamFull, chatId, "bot")
        await bot.sendMessage(chatId, texts.lotteryTeamFull)

        //набор регистрации продолжается
      } else {



          //запись в таблицу с прошедшими регу
        const Tusername = username ? "https://t.me/" + username : ""
        await googleSheets.spreadsheets.values.append({
          auth,
          spreadsheetId,
          range: registrationSheets,
          valueInputOption: "RAW",
          resource: {
            values: [[
              date, phone, name, subscribe, tname, Tusername,
              String(chatId), steamName, ref ? String(ref) : undefined,
              null, ip, city, region, country
            ]],
          }
        })

        await saveMessages("", chatId, "bot")
        await bot.sendMessage(chatId, texts.loteryRegDone(name))
        await bot.sendMessage(chatId, texts.loteryRefUrl(chatId, callDataInGame))

        //последний подпивас собрал команду
        if (count + 1 === commandMemberCount) {

          await bot.sendMessage(ref, texts.loteryAccept)
          await saveMessages(`${ref} полностью собрал всех подпивасов`,
            chatId, "bot")

          //получить данные кэпа
          const getRows = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range: registrationSheets
          })

          //отфильтровать кэпов
          const allRow = getRows.data.values.map(elem => {
            const [date, phone, name, subscribe, tname, Tusername,
              chatId, steamName, ref,
              type, ip, city, region, country] = elem
            return {
              date, phone, name, subscribe, tname, Tusername,
              chatId, steamName, ref,
              type, ip, city, region, country
            }
          })

          //записать в другую таблицу
          const userDoneData = allRow.filter(user => {
            return user.chatId === ref
          })[0]
          await getRegType(ref, lotterySheets, false, "lottery")
          await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: lotterySheets,
            valueInputOption: "RAW",
            resource: {
              values: [
                Object.values(userDoneData)
              ],
            }
          })
        }
      }


    }

  } else {
    await bot.sendMessage(chatId, texts.regionNotAlloved)
    await saveMessages("не подходящий регион " + region, chatId, "bot")
  }
}
