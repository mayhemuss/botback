import UserController from "../UserController.js";
import {bot} from "../index.js";
import {texts} from "../text.js";
import {saveMessages} from "../services/saveMessages.js";
import UserRegService from "../services/UserRegService.js";

export const registrationCommandGame = async (chatId, user, disciplineId, ipData, ref, body, game, ip) => {

  const messageToSave = {body, ip, ipData}

  const {registrationType, commandName, name} = body
  const {callData, commandMemberCount, gameName} = game

  if (registrationType === "capitan") {

    const newReg = await UserController
      .CreateOrUpdate(user, disciplineId, ipData, ref, body)
    if (newReg) {
      await bot.sendMessage(chatId, texts.capitanRegDone(name, commandName, commandMemberCount))
      await bot.sendMessage(chatId, texts.refUrl(chatId, callData, commandName, gameName))
      messageToSave.refUrl = texts.refUrl(chatId, callData, commandName, gameName)
      messageToSave.answer = `Спасибо за регистрацию, ${name}`

    } else {
      await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
      messageToSave.answer = `Спасибо за изменение данных, ${name}`
    }

    //усли не капитан
  } else {


    const command = await UserRegService.getCommand(disciplineId, ref)
    messageToSave.command = command
    //если команда расформирована
    if (command.length === 0) {
      await bot.sendMessage(chatId, "Капитапн команды расформировал команду")
    }else {

      //ид команды
      const commandIds = command.map(member => {
        return member.chatId
      })

      //команда не полна
      if (command.length < commandMemberCount) {
        const newReg = await UserController
          .CreateOrUpdate(user, disciplineId, ipData, ref, body)

        if (newReg) {
          await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
          messageToSave.answer = `Спасибо за регистрацию, ${name}.`
        } else {
          await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
          messageToSave.answer = `Спасибо за изменение данных, ${name}`
        }

        //команда заполнилась
        if (command.length + 1 === commandMemberCount) {


          //имя команды
          const comName = command[0].commandName

          for (const id of [...commandIds, chatId]) {
            try {
              await bot.sendMessage(id, texts.registrationDone(comName, gameName))

            } catch (e) {
              console.log(e)
            }
          }
          messageToSave.done = "Команда собралась"
          await saveMessages(JSON.stringify({
            command: [...commandIds, chatId],
            answer: "Команда собралась"
          }), chatId, "bot")
        }

        //если команда набрана
      } else {

        // если член команды
        if (commandIds.includes(chatId)) {
          const newReg = await UserController
            .CreateOrUpdate(user, disciplineId, ipData, ref, body)
          if (newReg) {
            await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
            messageToSave.answer = `Спасибо за регистрацию, ${name}.`
          } else {
            await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
            messageToSave.answer = `Спасибо за изменение данных, ${name}`
          }

          //если новый пытался
        } else {
          await bot.sendMessage(chatId, "Команда уже набрана")
          messageToSave.answer = "Команда уже набрана"
        }
      }
    }
  }
  await saveMessages(messageToSave, chatId, "bot")
}