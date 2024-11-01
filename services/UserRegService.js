import {UserReg} from "../models/models.js";
import {DataTypes, where} from "sequelize";

class UserRegService {
  async createUser(disciplineId, chatId, telegramName, userName, ref, commandName, registrationType, ip, city, region, country, phone, name, lotteryRegFull, steamName, rating) {
    console.log(ref)
    const user = await UserReg.create({
      chatId,
      telegramName,
      userName,
      ref,
      commandName,
      registrationType,
      ip,
      city,
      region,
      country,
      phone,
      name,
      disciplineId,
      lotteryRegFull,
      steamName,
      rating
    })

    return user

  }

  async getUser(disciplineId, chatId,) {
    const user = await UserReg.findOne({
      where: {
        chatId, disciplineId
      }
    })
    return user?.dataValues
  }

  async getCommand(disciplineId, ref) {
    const command = await UserReg.findAll({
      where: {disciplineId, ref}
    })
    return command.map(member => {
      return member.dataValues
    })
  }

  async editUser(user, phone, name, disciplineId) {
    await UserReg.update({phone, name}, {where: {id: user.id, disciplineId}})

  }

  async editLOtteryRegDone(chatId, disciplineId) {
    await UserReg.update({lotteryRegFull: true}, {where: {chatId, disciplineId}});
  }

  async deleteUserReg(disciplineId, chatId) {
    await UserReg.destroy({where: {disciplineId, chatId}})
  }

  async getAll() {
    const users = await UserReg.findAll()
    return users
  }

  async getCommandName(disciplineId, ref){
    const commandcapitan = await UserReg.findOne({where:{
        disciplineId, chatId: ref
      }})
  }

  async getDisciplines(disciplineId) {
    const users = await UserReg.findAll({where: {disciplineId}})
    if (users.length === 0) {
      return []
    }
    return users.map(user => {
      return user.dataValues
    })
  }

}

export default new UserRegService()