import {UserReg} from "../models/models.js";

class UserRegService {

  async createUser(disciplineId, body, ipData) {

    const {username} = body
    const Tusername = username ? "https://t.me/" + username : ""

    await UserReg.create({
      userName: Tusername,
      lotteryRegFull: false,
      disciplineId,
      ...body,
      ...ipData
    })

  }

  async getUser(disciplineId, chatId,) {
    const user = await UserReg.findOne({where: {chatId, disciplineId}})
    return user?.dataValues
  }

  async editUser(disciplineId, body, ipData, user) {
    const {phone, name, rating, steamName, username} = body
    const Tusername = username ? "https://t.me/" + username : ""
    await UserReg.update({phone, name, rating, steamName, Tusername, ...ipData}, {where: {id: user.id, disciplineId}})
  }

  async editLOtteryRegDone(chatId, disciplineId) {
    await UserReg.update({lotteryRegFull: true}, {where: {chatId, disciplineId}});
  }

  async getCommand(disciplineId, ref) {
    const command = await UserReg.findAll({
      where: {disciplineId, ref}
    })
    return command.map(member => {
      return member.dataValues
    })
  }

  async deleteUserReg(disciplineId, chatId) {
    await UserReg.destroy({where: {disciplineId, chatId}})
  }

  async getAll() {
    return await UserReg.findAll()
  }

  async getDiscipline(disciplineId) {
    return await UserReg.findAll({where: {disciplineId}})
  }

}

export default new UserRegService()