import {saveMessages} from "../services/saveMessages.js";
import {textCheck} from "./textCheck.js";
import {forms, gameVariantsText, texts} from "../text.js";
import {swearWords} from "../scenarios/swearWords.js";
import {skgID} from "../tokens/token.js";
import {startMessage} from "./startMessage.js";
import {decodeText} from "./codeDecode.js";
import {ADMIN_ID} from "../tokens/url.js";
import {timeCheck} from "./timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import {getCommandName} from "../services/getCommandName.js";
import {rawQueryToString} from "./rawQueryToString.js";
import {userids} from "../userids.js";
import {textCommandCheck} from "../scenarios/textCommandCheck.js";
import {bot} from "../index.js";
import {getDataFromExel} from "../services/exelData.js";

export const msgTextHandler = async (msg) => {
  const chatId = msg.chat.id;
  const user = msg.chat
  const text = msg.text;

  const messageToSave = {chatId, text, user}

  try {

    //проверка ругательств
    if (text && textCheck(text, gameVariantsText.swear_words)) {
      return  await swearWords(chatId)
      // return await saveMessages(JSON
      //   .stringify({...messageToSave, answer: "Ругательство"}), chatId)
    }

    //проверка подписки

    const signStatus = await bot.getChatMember(skgID, chatId)
    if (signStatus.status === 'left') {
      return   await bot.sendMessage(chatId, texts.subsribeText, forms.subscribeForm)
      // return await saveMessages(JSON
      //   .stringify({...messageToSave, answer: "не подписан"}), chatId)
    }


    if (text === "/start") {
      return    await startMessage(chatId)
      // return await saveMessages(JSON
      //   .stringify({...messageToSave, answer: "startMessage"}), chatId)
    }


    if (text.startsWith("/start ")) {

      console.log(text)
      const codedText = text.split(" ")[1]
      console.log(codedText)


      const decodedText = decodeText(codedText)
      messageToSave.codedText = codedText
      messageToSave.decodedText = decodedText

      const [capId, anonced, dateEnd] = decodedText.split("_")


      if (capId === "undefined") {
        await bot.sendMessage(chatId, "Произошла техническая ошибка, сейчас я свяжусь с вашим капитаном и мы ее исправим")
        await bot.sendMessage(ADMIN_ID, "битая ссылка у " + chatId)
        return await saveMessages(JSON
          .stringify({...messageToSave, answer: "битая реф ссылка"}), chatId, "bot")
      }

      const games = timeCheck(gamesList).filter(game => {
        return game.callData === `${anonced}_${dateEnd}`
      })

      if (games.length > 0) {

        const {registrationSheets, commandMemberCount, type, webAppUrl, imageUrl, gameName} = games[0]

        if (+capId === +chatId && type === "game") {
          await bot.sendMessage(chatId, "Вы уже зарегистрировались как Капитан команды")
          return await saveMessages(JSON.stringify(
            {
              ...messageToSave,
              answer: "Вы уже зарегистрировались как Капитан команды"
            }
          ), chatId)
        }

        if (+capId === +chatId && type === "lottery") {
          await bot.sendMessage(chatId, "Вы не может быть своим рефералом 🤣")
          return await saveMessages(JSON.stringify(
            {
              ...messageToSave,
              answer: "Вы не может быть своим рефералом"
            }
          ), chatId)
        }

        if (type === "game") {

          //обработка реферальной ссылки по игре
          const {commandName, count} = await getCommandName(registrationSheets, capId)
          messageToSave.commandName = commandName
          messageToSave.count = count

          if (count === 0) {
            return   await bot.sendMessage(chatId, `Капитан расформировал команду`)
            // return await saveMessages(JSON.stringify(
            //   {
            //     ...messageToSave, answer: `Капитан расформировал команду`
            //   }), chatId, "bot")
          }


          if (count >= commandMemberCount) {
            return   await bot.sendMessage(chatId, `Команды ${commandName} уже набрана`)
            // return await saveMessages(JSON.stringify(
            //   {
            //     ...messageToSave, answer: `Команды ${commandName} уже набрана`
            //   }), chatId, "bot")
          }

          const {lenght, query} = rawQueryToString(
            {
              commandName,
              callData: `${anonced}_${dateEnd}`,
              ref: capId,
              commandMemberCount,
              regText: "Зарегистрироваться",
            }
          )

          messageToSave.query = query

          await bot.sendPhoto(chatId, imageUrl)

          return     await bot.sendMessage(
            chatId,
            texts.gameReferalText(commandName, gameName),
            forms.gameReferalForm(webAppUrl, query)
          )

          // return await saveMessages(JSON.stringify(
          //   {
          //     ...messageToSave,
          //     answer: "меню регистрации участника команды"
          //   }
          // ), chatId)
        }

        if (type === "lottery") {

          //обработка реферальной ссылки с розыгрышем
          const {count} = await getCommandName(registrationSheets, capId)

          messageToSave.count = count

          //уже все рефералы набраны
          if (count >= commandMemberCount) {
            await bot.sendMessage(chatId, texts.lotteryTeamFull)
            return await saveMessages(JSON.stringify({
              ...messageToSave,
              answer: `рефералы ${capId} уже найдены`
            }), chatId)

            //рефералы еще не набраны
          } else {

            //человек уже был подписан
            if (userids.includes(chatId)) {

              await bot.sendMessage(chatId, texts.loteryMemberInList)
              return await saveMessages(JSON.stringify({
                ...messageToSave,
                answer: texts.loteryMemberInList
              }), chatId, "bot")

              //человек не был подписан
            } else {

              const {lenght, query} = rawQueryToString(
                {
                  callData: `${anonced}_${dateEnd}`,
                  ref: capId,
                  commandMemberCount,
                  regText: "Зарегистрироваться",
                }
              )

              await bot.sendPhoto(chatId, games[0].imageUrl)
              await bot.sendMessage(
                chatId,
                texts.referalText,
                forms.lotteryReferalForm(webAppUrl, query))
              return saveMessages(JSON.stringify(
                {...messageToSave, answer: "Меню регистрации рефа лотереи"}), chatId)
            }
          }
        }
      }
    }
    //проверка запросов по играм
    return textCommandCheck(text, chatId, messageToSave)


  } catch
    (error) {
    console.log(error)
    await bot.sendMessage(chatId, texts.allBad)
    await bot.sendMessage(ADMIN_ID,
      JSON.stringify({error}) + ` что то пошло не так у ${chatId}`)
    await saveMessages(texts.allBad, chatId, "bot")
  }
}

