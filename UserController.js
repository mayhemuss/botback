import UserRegService from "./services/UserRegService.js";

class UserController {
  async CreateOrUpdate(user, disciplineId, ipData, ref, body) {

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

  async getUserDiscipline(disciplineId) {
    const users = await UserRegService.getDiscipline(disciplineId);
    if(users.length > 0) {
      return users.map(user => user.dataValues)
    }
   return null
  }
}

export default new UserController()