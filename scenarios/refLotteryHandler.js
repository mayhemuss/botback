import {bot} from "../index.js";
import {forms, texts} from "../text.js";
import {saveMessages} from "../services/saveMessages.js";
import {userids} from "../userids.js";

export const refLotteryHandler = async (chatId, ref, game, command, messageToSave) => {

  const {commandMemberCount, webAppUrl, imageUrl, callData} = game

  const members = command.filter(member => {
    return member.ref !== member.chatId
  })

  //обработка реферальной ссылки с розыгрышем
  const count = members.length

  messageToSave.count = count

  //уже все рефералы набраны
  if (count >= commandMemberCount + 8) {
    await bot.sendMessage(chatId, texts.lotteryTeamFull)
    messageToSave.answer = `рефералы ${ref} уже найдены`

    //рефералы еще не набраны
  } else {
const users = userids.map(user=>user.id)
    //человек уже был подписан
    if (users.includes(chatId)) {

      await bot.sendMessage(chatId, texts.loteryMemberInList)
      messageToSave.answer = texts.loteryMemberInList

      //человек не был подписан
    } else {

      const text = texts.referalText
      const form = forms.gameReferalForm(webAppUrl, {callData, ref})

      await bot.sendPhoto(chatId, imageUrl)
      await bot.sendMessage(chatId, text, form)
      messageToSave.answer = text

    }
  }
  return await saveMessages(JSON.stringify(messageToSave), chatId)
}
