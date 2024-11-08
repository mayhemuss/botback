import {Discipline} from "../models/models.js";

class DisciplineService {
  async createOrGet(callData, name, type, date) {

    const candidateDiscipline = await Discipline.findOne({where: {callData}})
    if (!candidateDiscipline) {
      const id = await Discipline.create({
          name,
          type,
          date,
          callData
        }
      )
      return id.dataValues.id
    }
    return candidateDiscipline.dataValues.id
  }

  async getAll() {
    const disciplines = await Discipline.findAll()
    return disciplines.map(dis => {
      return dis.dataValues
    })
  }

  async get(callData) {

    const discipline = await Discipline.findOne({where: {callData}})
    // console.log(discipline)
    if (discipline) {
      return discipline.dataValues
    }
    return null
  }

}

export default new DisciplineService()




