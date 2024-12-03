import {bot} from "../index.js";
import { texts} from "../text.js";
import {saveMessages} from "../services/saveMessages.js";
import {userids} from "../tokens/userids.js";
import DisciplineService from "../services/DisciplineService.js";
import UserController from "../UserController.js";
import UserRegService from "../services/UserRegService.js";


export const refLotteryHandler = async (chatId, ref, game, command, messageToSave) => {

  const {commandMemberCount, callData} = game
  const {user: {username, first_name}} = messageToSave


  const discipline = await DisciplineService.get(callData)

  const userDB = await UserRegService.getUser(discipline.id, chatId)
  const ipData = {city: "", region: "", country: ""}

  const body = {
    chatId,
    username,
    telegramName: first_name,
    registrationType: "user",
    ref,
    phone: "",
    name:""
  }

  //если не был в списке подписоты до этого
  if (!userids.map(member => member.id).includes(chatId)) {

    messageToSave.command = command

    const beerMember = command.filter(member => {
      return member.chatId !== member.ref
    })

    //рега рефералом
    const newReg = await UserController
      .CreateOrUpdate(userDB, discipline.id, ipData, ref, body)

    //новая рега
    if (newReg) {
      await bot.sendMessage(chatId, "Спасибо за регистрацию вашего друга как участника розыгрыша. \n\nЕсли вы хотите сами участвовать в Новогоднем Розыгрыше " +
        `нажмите /start и пройдите регистрацию в Новогоднем Розыгрыше. `)
      messageToSave.answer = `активация друга ${ref}`

      //второй подпивас регнулся
      if (beerMember.length + 1 === commandMemberCount) {
        await UserController.editLOtteryRegDone(+ref, discipline.id);
        await bot.sendMessage(ref, texts.loteryAccept)
        messageToSave.done = texts.loteryAccept
      }

      //если второй раз тыкает реф ссылку
    } else {
      await bot.sendMessage(chatId, `Вы уже зарегистрировали своего друга в новогоднем розыгрыше, повторная регистрация друга или другого человека невозможна`)
      messageToSave.answer = `вы уже активировали регистрацию своего друга`
    }

    //был подписан до этого
  } else {
    await bot.sendMessage(chatId, texts.loteryMemberInList)
    messageToSave.answer = texts.loteryMemberInList
  }

  //
  // const members = command.filter(member => {
  //   return member.ref !== member.chatId
  // })
  //
  // //обработка реферальной ссылки с розыгрышем
  // const count = members.length
  //
  // messageToSave.count = count
  //
  // //уже все рефералы набраны
  // if (count >= commandMemberCount + 8) {
  //   await bot.sendMessage(chatId, texts.lotteryTeamFull)
  //   messageToSave.answer = `рефералы ${ref} уже найдены`
  //
  //   //рефералы еще не набраны
  // } else {
  //   const users = userids.map(user => user.id)
  //   //человек уже был подписан
  //   if (users.includes(chatId)) {
  //
  //     await bot.sendMessage(chatId, texts.loteryMemberInList)
  //     messageToSave.answer = texts.loteryMemberInList
  //
  //     //человек не был подписан
  //   } else {
  //
  //     const text = texts.referalText
  //     const form = forms.gameReferalForm(webAppUrl, {callData, ref})
  //
  //     await bot.sendPhoto(chatId, imageUrl)
  //     await bot.sendMessage(chatId, text, form)
  //     messageToSave.answer = text
  //
  //   }
  // }
  return await saveMessages(JSON.stringify(messageToSave), chatId)
}
