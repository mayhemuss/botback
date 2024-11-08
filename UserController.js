import UserRegService from "./services/UserRegService.js";
import {UserReg} from "./models/models.js";

class UserController {
  async CreateOrUpdate(user, disciplineId, ipData, ref, body ) {

    if (!user) {

      await UserRegService.createUser(disciplineId, body, ipData)
      return true
    } else {
      await UserRegService.editUser(disciplineId, body, ipData, user)
      return false
    }
  }

  async editLOtteryRegDone(chatId, disciplineId) {
    await UserRegService.editLOtteryRegDone(chatId, disciplineId);
  }
}

export default new UserController()