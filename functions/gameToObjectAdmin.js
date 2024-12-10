import {gamesList} from "../games/gamesList.js";
import DisciplineService from "../services/DisciplineService.js";
import UserRegService from "../services/UserRegService.js";
import {editMessages} from "./editMessages.js";
import {texts} from "../text.js";

export const gameToObjectAdmin = async (list) => {
  const actualList = gamesList.map(game => {
    const {anonced, dateEnd, callData: callInGame} = game
    const callData = callInGame ? callInGame : anonced + "_" + dateEnd
    return {...game, callData}
  })
  const obj = {
    admin_main: {
      editRegistrationMenu: async (chatId, message_id) => {

      }
    }
  }


  actualList.forEach(event => {
    if (event.commandMemberCount > 1) {
      obj["admin_" + event.callData] = {
        editRegistrationMenu: async (chatId, message_id) => {
          const discipline = await DisciplineService.get(event.callData)
          const allUsers = await UserRegService.getAll(discipline.id)
          const allRegs = allUsers.length

          if (allRegs.length === 0) {

            return await editMessages(chatId, message_id, [[{
              text: "<--Назад",
              callback_data: "admin_main"
            }]], "пока нет зарегистрированных на мероприятие")
          }

          const gameObj = {}
          allUsers.forEach(user => {
            gameObj[user.ref] ??= []
            gameObj[user.ref].push(user)
          })


          let fullTeamCount = 0

          const fullTeams = Object.keys(gameObj).filter(ref => {
            const teamCount = gameObj[ref].length
            if (teamCount === event.commandMemberCount) fullTeamCount++

            return teamCount === event.commandMemberCount
          })

          if (fullTeamCount > 0) {
            const capitansFullTeam = fullTeams.map(comand => {
              const capitan = comand.filter(oneMember => {
                return oneMember.ref === oneMember.chatId
              })[0]
              return capitan.username ? capitan.username : capitan.phone
            })
            return await editMessages(chatId, message_id, [], "")
          } else {

          }

        }
      }
    }
  })

  return obj
}