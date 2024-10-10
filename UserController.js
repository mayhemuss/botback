import UserRegService from "./services/UserRegService.js";

class UserController {
  async CreateOrUpdate(user, disciplineId, chatId, tname, username, ref, commandName, regType, ip, city, region, country, phone, name, lotteryRegFull, steamName, rating) {
    console.log("ref   " + ref)
    if (!user) {
      const Tusername = username ? "https://t.me/" + username : ""
      await UserRegService.createUser(disciplineId, chatId, tname, Tusername, ref === undefined || ref === "" ? chatId : +ref, commandName, regType, ip, city, region, country, phone, name, lotteryRegFull, steamName, rating)
      return true
    } else {
      await UserRegService.editUser(user, phone, name, disciplineId)
      return false
    }
  }

  async toggleRegDone(id) {
  }
}

export default new UserController()