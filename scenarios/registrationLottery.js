import {saveMessages} from "../services/saveMessages.js";
import {bot} from "../index.js";
import UserController from "../UserController.js";
import {texts} from "../text.js";
import {userids} from "../tokens/userids.js";
import UserRegService from "../services/UserRegService.js";

const regions = [
  "Санкт-Петербург",
  "Ленинградская область",
  "St Petersburg",
  "Leningradskaya",
  "SPE",
  "Выборг",
  "Приозерск",
  "Кингисепп",
  "Тосно",
  "Сертолово",
  "Зеленогорск",
  "Ленинградская"
]

export const registrationLottery = async (chatId, user, disciplineId, ipData, ref, body, game, ip) => {
  const regi = ipData.map(one => {
    const {city, region,} = one
    return [city, region];
  }).flat()

  console.log(regi)
  // const {city, region,} = ipData
  const {name} = body
  const {callData, commandMemberCount} = game
  const messageToSave = {body, ip, ipData};

  if (regions.some(one => regi.includes(one))) {

    //первичная рега кэпа подпивасов
    if (ref === chatId) {
      const newReg = await UserController
        .CreateOrUpdate(user, disciplineId, ipData, ref, body)
      if (newReg) {
        await bot.sendMessage(chatId, texts.loteryRegDone(name), {parse_mode: 'Markdown'})
        await bot.sendMessage(chatId, texts.loteryRefUrl(chatId, callData), {parse_mode: 'Markdown'})
        messageToSave.answer = texts.loteryRefUrl(chatId, callData)
      } else {
        await bot.sendMessage(chatId, texts.loteryRegDone(name), {parse_mode: 'Markdown'})
        await bot.sendMessage(chatId, texts.loteryRefUrl(chatId, callData), {parse_mode: 'Markdown'})
        messageToSave.answer = texts.loteryRefUrl(chatId, callData)
      }

      //регистрация подпиваса
    } else {

      //если пытается зарегаться подпивасом, но уже был подписан
      if (userids.map(member => member.id).includes(chatId)) {
        const newReg = await UserController
          .CreateOrUpdate(user, disciplineId, ipData, chatId, body)
        if (newReg) {
          await bot.sendMessage(chatId, texts.loteryMemberInList)
          await bot.sendMessage(chatId, texts.loteryRegDone(name), {parse_mode: 'Markdown'})
          await bot.sendMessage(chatId, texts.loteryRefUrl(chatId, callData), {parse_mode: 'Markdown'})
          messageToSave.answer = texts.loteryRefUrl(chatId, callData)
          messageToSave.loteryMemberInList = texts.loteryMemberInList
        } else {
          await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
          messageToSave.answer = `Спасибо за изменение данных, ${name}`
        }

        //если пытается зарегаться подпивасом, и не был подписан
      } else {

        const command = await UserRegService.getCommand(disciplineId, ref)

        messageToSave.command = command

        const beerMember = command.filter(member => {
          return member.chatId !== member.ref
        })

        const beerMemberId = beerMember.map(member => member.chatId)


        //если подпивасы не набраны
        if (beerMember.length < 10 || beerMemberId.includes(+chatId)) {
          const newReg = await UserController
            .CreateOrUpdate(user, disciplineId, ipData, ref, body)
          //новая регистрация
          if (newReg) {

            await bot.sendMessage(chatId, texts.loteryRegDone(name))
            await bot.sendMessage(chatId, texts.loteryRefUrl(chatId, callData))
            messageToSave.answer = texts.loteryRefUrl(chatId, callData)


            //если последний подпивас вкоманду
            if (beerMember.length + 1 === commandMemberCount) {
              await UserController.editLOtteryRegDone(+ref, disciplineId);
              await bot.sendMessage(ref, texts.loteryAccept)
              messageToSave.done = texts.loteryAccept
            }

            //изменение данных
          } else {
            await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
            messageToSave.answer = `Спасибо за изменение данных, ${name}`
          }

          //если подпивасы уже набраны
        } else {

          await bot.sendMessage(chatId, texts.lotteryTeamFull)
        }

      }


    }

  } else {
    await bot.sendMessage(chatId, texts.regionNotAlloved)
    messageToSave.answer = texts.regionNotAlloved
  }
  await saveMessages(JSON.stringify(messageToSave), chatId, "bot")
}
