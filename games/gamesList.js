import {texts} from "../text.js";

export const gamesList = [
  {
    gameName: "Dota 2",
    dateStart: +(new Date(2024, 7, 9, 10)),
    dateEnd: +(new Date(2024, 7, 30, 23, 59, 59)),
    descriptions: "Регистрация на новый турнир по Dota 2, Выбери как зарегистрироваться, " +
      "как капитан или как член комманды?",
    registrationSheets: "Dotareg31_08_24",
    imageUrl: "https://sun9-50.userapi.com/impg/XsxpMN9gEg2vxS1I0gTtOwVd7kAPqd-lnvzN1g/4Lu7rjvPjB0.jpg?size=1920x1080&quality=95&sign=311e0ef60315b00c9269fe1dcdb24cfb&type=album",
    reglaments: texts.capitanReg,
    commandMemberCount: 5,
    webAppUrl: "https://skynetgamesbot.ru/games",
    anonced: "dota",
    anoncedPost: ""
  },

]
