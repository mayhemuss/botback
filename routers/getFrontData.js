import {timeCheck} from "../functions/timeCheck.js";
import {gamesList} from "../games/gamesList.js";
import DisciplineService from "../services/DisciplineService.js";
import UserRegService from "../services/UserRegService.js";
import {saveMessages} from "../services/saveMessages.js";

export const getFrontData = async(req,res) => {

    const messageToSave = {nginxIp: req.ip}
    try {
      const {ref, callData, chatId} = req.body;

      const result = {};
      messageToSave.body = {ref, callData, chatId}
      const game = timeCheck(gamesList).filter(game => {
        return game.callData === callData
      })[0]

      const commandMemberCount = game.commandMemberCount

      result.inAppimageUrl = game.inAppimageUrl
      result.commandMemberCount = commandMemberCount

      const discipline = await DisciplineService.get(callData)
      const user = await UserRegService.getUser(discipline.id, chatId)

      if (commandMemberCount > 1 && game.type === "game") {

        try {
          const command = await UserRegService.getCommand(discipline.id, +ref)

          result.commandName = command[0].commandName
        } catch (e) {

        }

      }
      if (game.type === "game" || game.type === "mix") {
        result.regText = user ? "Изменить данные" : "Зарегистрироваться"
      } else if (game.type === "lottery") {
        result.regText = user ? "Изменить данные" : "Получить реферальную ссылку"
      }

      result.fields = game.fields

      messageToSave.result = result
      res.json(result)
      return await saveMessages(JSON
        .stringify({...messageToSave, answer: "открыл страницу регистрации"}), chatId)

    } catch (e) {
      console.log(e)
      await saveMessages(JSON
        .stringify({...req.body, answer: "не смог открыть страницу с регистрацией"}), 11)
      return res.json(e);
    }

}