import {skgID} from "../tokens/token.js";
import {forms, texts} from "../text.js";
import {saveMessages} from "../services/saveMessages.js";
import {startMessage} from "./startMessage.js";
import {gameToObject} from "./gameToObject.js";
import {gamesList} from "../games/gamesList.js";
import {bot} from "../index.js";
import {ADMIN_ID} from "../tokens/url.js";
import {deleteMemberFromTeam} from "./deleteMemberFromTeam.js";

export const msgCallbackQueryHandler = async (msg) => {
  const chatId = msg.from.id;
  const message_id = msg.message.message_id
  const callBackData = msg.data
  const user = msg.from

  const messageToSave = {user, callBackData}

  //проверка подписки

  const signStatus = await bot.getChatMember(skgID, chatId)
  if (signStatus.status === 'left') {
    await bot.sendMessage(chatId, texts.subsribeText, forms.subscribeForm)
    return await saveMessages(JSON
      .stringify({...messageToSave, answer: texts.subsribeText}), chatId,)
  }

  try {

    //проверка кнопки подписался
    if (callBackData === "Подписался!") {
      const signStatus = await bot.getChatMember(skgID, chatId)
      if (signStatus.status === 'left') {
        await bot.sendMessage(chatId, texts.stillNeedSubscribe, forms.subscribeForm)
        return await saveMessages(JSON
          .stringify({...messageToSave, answer: texts.stillNeedSubscribe}), chatId,)
      } else {
        await startMessage(chatId)
        return await saveMessages(JSON
          .stringify({...messageToSave, answer: "подписался, попал в главное меню"}), chatId,)
      }
    }

    const gameObj = gameToObject(gamesList)

    if (callBackData.startsWith("delete")) {
      return await deleteMemberFromTeam(callBackData, gameObj, chatId, message_id, messageToSave)
    }
    //регистрация открыта
    if (Object.keys(gameObj).includes(callBackData)) {


      await gameObj[callBackData].editRegistrationMenu(chatId, message_id)
      return await saveMessages(JSON.stringify({...messageToSave, answer: "нажата кнопка"}), chatId)

    }

    //регистрация закрыта
    await gameObj.AwaitNew.editRegistrationMenu(chatId, message_id)
    return await saveMessages(JSON
      .stringify({...messageToSave, answer: "ожидаем новых мероприятий"}), chatId,)

  } catch (error) {
    console.log(error)
    await bot.sendMessage(chatId, "Ожидаем анонса новых мероприятий...")
    if (error.message !== "ETELEGRAM: 400 Bad Request: message is not modified: specified new message content and reply markup are exactly the same as a current content and reply markup of the message") {
      await bot.sendMessage(ADMIN_ID,
        JSON.stringify({error}) + ` что то пошло не так у ${chatId}`)
    }

    return await saveMessages(JSON
      .stringify({...messageToSave, answer: "ожидаем новых мероприятий"}), chatId,)

  }
}
