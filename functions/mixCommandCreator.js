import DisciplineService from "../services/DisciplineService.js";
import UserController from "../UserController.js";

export const mixCommandCreator = async (callData) => {
  const discipline = await DisciplineService.get(callData)
  if (discipline) {
    const users = await UserController.getUserDiscipline(discipline.id)
    if (users) {

      const middleRating = users.map((user) => Number(user.rating)).reduce((acc, number) => acc + number, 0) / users.length
      console.log(middleRating)
    }
  }
}