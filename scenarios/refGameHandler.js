import {bot} from "../index.js";
import {saveMessages} from "../services/saveMessages.js";
import {forms, texts} from "../text.js";

export const refGameHandler = async (chatId, ref, game, command, messageToSave) => {

  //обработка реферальной ссылки по игре
  const {commandMemberCount, webAppUrl, imageUrl, gameName, callData} = game

  const count = command.length

  messageToSave.count = count

  //команды нет
  if (count === 0) {

    await bot.sendMessage(chatId, `Капитан расформировал команду`)

    messageToSave.answer = `Капитан расформировал команду`

    //команда существует
  } else {

    const commandName = command[0].commandName
    messageToSave.commandName = commandName

    const commandIds = command.map(member => +member.chatId)

    if (count >= commandMemberCount + 2 && !commandIds.includes(chatId)) {

      await bot.sendMessage(chatId, `Команды ${commandName} уже набрана`)

      messageToSave.answer = `Команды ${commandName} уже набрана`

    } else {

      const text = texts.gameReferalText(commandName, gameName)
      const form = forms.gameReferalForm(webAppUrl, {callData, ref})

      await bot.sendPhoto(chatId, imageUrl)
      await bot.sendMessage(chatId, text, form)

      messageToSave.answer = texts.gameReferalText(commandName, gameName)
    }
  }

  return await saveMessages(JSON.stringify(messageToSave), chatId)
}
