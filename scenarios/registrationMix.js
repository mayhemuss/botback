import UserController from "../UserController.js";
import {bot} from "../index.js";
import {saveMessages} from "../services/saveMessages.js";

export const registrationMix = async (chatId, user, disciplineId, ipData, ref, body, game, ip) => {
  const messageToSave = {body, ip, ipData}
  const {name} = body
  const newReg = await UserController
    .CreateOrUpdate(user, disciplineId, ipData, ref, body)
  if (newReg) {
    await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
    messageToSave.answer = `Спасибо за регистрацию, ${name}`
  } else {
    await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
    messageToSave.answer = `Спасибо за изменение данных, ${name}`
  }
  await saveMessages(JSON.stringify(messageToSave), chatId, "bot")
}
