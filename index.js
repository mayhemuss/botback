import TelegramBot from 'node-telegram-bot-api'
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {skgID, TelegramToken} from "./tokens/token.js";
import router from "./router.js";
import {ADMIN_ID, BACK_URL, PORT} from "./tokens/url.js";
import {commands, forms, gameVariantsText, texts} from "./text.js";
import {textCheck} from "./functions/textCheck.js";
import {swearWords} from "./scenarios/swearWords.js";
import {timeCheck} from "./functions/timeCheck.js";
import {saveMessages} from "./services/saveMessages.js";
import {textCommandCheck} from "./scenarios/textCommandCheck.js";
import {gamesList} from "./games/gamesList.js";
import {getCommandName} from "./services/getCommandName.js";
import {startMessage} from "./functions/startMessage.js";
import {rawQueryToString} from "./functions/rawQueryToString.js";
import {gameToObject} from "./functions/gameToObject.js";
import {decodeText} from "./functions/codeDecode.js";
import {userids} from "./userids.js";


dotenv.config();


export const bot = new TelegramBot(TelegramToken, {polling: true});
const app = express();
app.use(cors());


app.use(express.json({limit: '70mb'}));
// app.use("/api/reg", router)
app.use("/reg", router)

const start = async () => {

  try {
    app.listen(PORT, BACK_URL, () => console.log(`server start at https://${BACK_URL}:${PORT}`));
  } catch (error) {
    console.log(error);
  }

  await bot.setMyCommands(commands);
  bot.on('message', async (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text;



      await saveMessages(text, chatId)

      try {
        //проверка ругательств
        if (text && textCheck(text, gameVariantsText.swear_words)) {
          return swearWords(chatId)
        }

        //проверка подписки

        const signStatus = await bot.getChatMember(skgID, chatId)
        if (signStatus.status === 'left') {
          await bot.sendMessage(chatId, texts.subsribeText, forms.subscribeForm)
          return await saveMessages(texts.subsribeText, chatId, "bot")
        }


        if (text === "/start") {

          return await startMessage(chatId)

        }


        if (text.startsWith("/start ")) {
//

          console.log(text)
          const codedText = text.split(" ")[1]
          console.log(codedText)
          await saveMessages(codedText, chatId)

          const [capId, anonced, dateEnd] = decodeText(codedText).split("_")
          if (capId === "undefined") {
            await saveMessages("битая реф ссылка", chatId, "bot")
            await bot.sendMessage(chatId, "Произошла техническая ошибка, сейчас я свяжусь с вашим капитаном и мы ее исправим")
            return await bot.sendMessage(ADMIN_ID, "битая ссылка у " + chatId)
          }
          await saveMessages(decodeText(codedText), chatId)

          const games = timeCheck(gamesList).filter(game => {
            return game.callData === `${anonced}_${dateEnd}`
          })


          if (games.length > 0) {

            const {registrationSheets, commandMemberCount, type, webAppUrl} = games[0]
            if (+capId === +chatId && type === "game") {
              await bot.sendMessage(chatId, "Вы уже зарегистрировались как Капитан команды")
              return await saveMessages("Вы уже зарегистрировались как Капитан команды", chatId, "bot")
            }
            if (+capId === +chatId && type === "lottery") {
              await bot.sendMessage(chatId, "Вы не может быть своим рефералом 🤣")
              return await saveMessages("Вы не может быть своим рефералом", chatId, "bot")
            }

            if (type === "game") {
                //обработка реферальной ссылки по игре
              const {commandName, count} = await getCommandName(registrationSheets, capId)
              if (count >= commandMemberCount) {
                await bot.sendMessage(chatId, `Команды ${commandName} уже набрана`)
                return await saveMessages(`Команды ${commandName} уже набрана`, chatId, "bot")
              }
              await saveMessages(commandName + " _ " + count, chatId, "bot")
              const {lenght, query} = rawQueryToString(
                {
                  commandName,
                  callData: `${anonced}_${dateEnd}`,
                  ref: capId,
                  commandMemberCount: games[0].commandMemberCount,
                  regText: "Зарегистрироваться",

                }
              )

              await bot.sendPhoto(chatId, games[0].imageUrl)

              return await bot.sendMessage(
                chatId,
                texts.gameReferalText(commandName, games[0].gameName),
                forms.gameReferalForm(webAppUrl, query)
              )

            }

            if (type === "lottery") {

              //обработка реферальной ссылки с розыгрышем
              const {count} = await getCommandName(registrationSheets, capId)

              //уже все рефералы набраны
              if (count >= commandMemberCount) {
                await bot.sendMessage(chatId, texts.lotteryTeamFull)
                return await saveMessages(`рефералы ${capId} уже найдены`, chatId, "bot")

                //рефералы еще не набраны
              } else {

                //человек уже был подписан
                if (userids.includes(chatId)) {

                  await bot.sendMessage(chatId, texts.loteryMemberInList)
                  return await saveMessages(texts.loteryMemberInList, chatId, "bot")

                  //человек не был подписан
                } else {

                  const {lenght, query} = rawQueryToString(
                    {
                      callData: `${anonced}_${dateEnd}`,
                      ref: capId,
                      commandMemberCount: games[0].commandMemberCount,
                      regText: "Зарегистрироваться",
                    }
                  )

                  await bot.sendPhoto(chatId, games[0].imageUrl)
                  return await bot.sendMessage(
                    chatId,
                    texts.referalText,
                    forms.lotteryReferalForm(webAppUrl, query))
                }
              }
            }
          }
        }
        //проверка запросов по играм
        return textCommandCheck(text, chatId)


      } catch
        (error) {
        console.log(error)
        await bot.sendMessage(chatId, texts.allBad)
        await saveMessages(texts.allBad, chatId, "bot")
      }
    }
  )
  ;

  bot.on("callback_query", async (msg) => {
    const chatId = msg.from.id;
    const message_id = msg.message.message_id
    const callBackData = msg.data

    //проверка подписки

    const signStatus = await bot.getChatMember(skgID, chatId)
    if (signStatus.status === 'left') {
      await bot.sendMessage(chatId, texts.subsribeText, forms.subscribeForm)
      return await saveMessages(texts.subsribeText, chatId, "bot")
    }

    await saveMessages(callBackData, chatId)

    try {

      if (callBackData === "Подписался!") {
        const signStatus = await bot.getChatMember(skgID, chatId)
        if (signStatus.status === 'left') {
          await bot.sendMessage(chatId, texts.stillNeedSubscribe, forms.subscribeForm)
          return await saveMessages(texts.stillNeedSubscribe, chatId, "bot")
        } else {
          await startMessage(chatId)
          return await saveMessages("главноее меню", chatId, "bot")
        }
      }

      // console.log(msg.data)
      console.log(callBackData)
      // console.log(await gameToObject(gamesList, bot)[callBackData])
      const gameObj = gameToObject(gamesList, bot)

      if (Object.keys(gameObj).includes(callBackData)) {
        return await gameObj[callBackData].editRegistrationMenu(chatId, message_id)
      }
      await gameObj.AwaitNew.editRegistrationMenu(chatId, message_id)
      return await saveMessages("Ожидаем мероприятий", chatId, "bot")

    } catch (error) {
      console.log(error)
      await bot.sendMessage(chatId, "Ожидаем анонса новых мероприятий...")
      await saveMessages("Ожидаем анонса новых мероприятий...", chatId, "bot")
    }


  })
}
bot.on("web_app_data", async (msg) => {


})

start()
