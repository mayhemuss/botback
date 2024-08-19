import {texts} from "../text.js";

export const gamesList = [
  {
    gameName: "Dota 2",
    dateStart: +(new Date(2024, 7, 19, 14 - 3)),
    dateEnd: +(new Date(2024, 7, 30, 23 - 3, 59)),
    descriptions: "Регистрация на новый турнир по Dota 2, Выбери как зарегистрироваться, " +
      "как капитан команды или как член команды?",
    registrationSheets: "Dotareg31_08_24",
    imageUrl: "https://sun9-50.userapi.com/impg/XsxpMN9gEg2vxS1I0gTtOwVd7kAPqd-lnvzN1g/4Lu7rjvPjB0.jpg?size=1920x1080&quality=95&sign=311e0ef60315b00c9269fe1dcdb24cfb&type=album",
    reglaments: "С Регламентом турнира по Dota 2 можно ознакомится по данной ссылке: https://clck.ru/3CgxHQ \n \n" + texts.capitanReg +
      "\n \nДля подтверждения участия мы позвоним вашему капитану за 2-3 дня до кибер-турнира. Удачи на SkyNet GAMES!",
    commandMemberCount: 5,
    webAppUrl: "https://skynetgamesbot.ru",
    anonced: "dota",
    anoncedPost: "https://t.me/games_skynet"
  },

]
