import {saveMessages} from "../services/saveMessages.js";
import {textCheck} from "./textCheck.js";
import {forms, gameVariantsText, texts} from "../text.js";
import {swearWords} from "../scenarios/swearWords.js";
import {skgID} from "../tokens/token.js";
import {startMessage} from "./startMessage.js";
import {ADMIN_ID} from "../tokens/url.js";
import {textCommandCheck} from "../scenarios/textCommandCheck.js";
import {bot} from "../index.js";
import {refUrlHandler} from "../scenarios/refUrlHandler.js";

export const msgTextHandler = async (msg) => {

  const chatId = msg.chat.id;
  const user = msg.chat
  const text = msg.text;

  const messageToSave = {chatId, text, user}

  try {

    //проверка ругательств
    if (text && textCheck(text, gameVariantsText.swear_words)) {
      await swearWords(chatId)
      return await saveMessages(JSON
        .stringify({...messageToSave, answer: "Ругательство"}), chatId)
    }

    //проверка подписки
    const signStatus = await bot.getChatMember(skgID, chatId)
    if (signStatus.status === 'left') {
      await bot.sendMessage(chatId, texts.subsribeText, forms.subscribeForm)
      return await saveMessages(JSON
        .stringify({...messageToSave, answer: "не подписан"}), chatId)
    }

    if (text === "/start") {
      await startMessage(chatId)
      return await saveMessages(JSON
        .stringify({...messageToSave, answer: "startMessage"}), chatId)
    }

    //обработка реферальных ссылок
    if (text.startsWith("/start ")) {
      return await refUrlHandler(chatId, text, messageToSave)
    }

    //проверка запросов по играм
    return textCommandCheck(text, chatId, messageToSave)

  } catch
    (error) {
    console.log(error)
    await bot.sendMessage(chatId, texts.allBad)
    await bot.sendMessage(ADMIN_ID,
      JSON.stringify(error) + ` что то пошло не так у ${chatId}`)
    await saveMessages(JSON.stringify(error), chatId, "bot")
  }
}

