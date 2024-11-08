
import {registrationSingleGame} from "../routers/registrationSingleGame.js";
import {registrationCommandGame} from "../routers/registrationCommandGame.js";

export const registrationGame = async (chatId, user, disciplineId, ipData, ref, body, game,ip) => {


  const {commandMemberCount,} = game

  if (commandMemberCount > 1) {
    await registrationCommandGame(chatId, user, disciplineId, ipData, ref, body, game, ip)
  } else {
    await registrationSingleGame(chatId, user, disciplineId, ipData, ref, body, game, ip)
  }
}
