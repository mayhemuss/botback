import {texts} from "../text.js";

export const gamesList = [

  {
    gameName: "Counter-Strike 2 \"2x2\"",
    dateStart: +(new Date(2024, 11 - 1, 1, 17 - 3,25)),
    dateEnd: +(new Date(2024, 11 - 1, 15, 23 - 3, 59)),
    descriptions: "Регистрация на новый турнир по Counter-Strike 2 \"2x2\", Выбери как зарегистрироваться, " +
      "как капитан команды или как член команды?",
    registrationSheets: "cs_17_11_24",
    imageUrl: "https://sun9-50.userapi.com/impg/iMq8QN6bufDab5J17SAutQN3uqm15W0d29pNeQ/AVYrwhpWUO4.jpg?size=1920x1080&quality=95&sign=c6485f43735ef269f9f9c2414c886316&type=album",
    inAppimageUrl :"https://sun9-48.userapi.com/impg/XqCNP5HpA0mkQOq2c3mxBLzkz2oW3fy7rcrupg/RjMaqf4hVjc.jpg?size=1080x1920&quality=95&sign=b6e03cb44d4d27102cc065422d2bf3f0&type=album",
    reglaments: "С Регламентом турнира по Counter-Strike 2 \"2x2\" можно ознакомится по данной ссылке: https://clck.ru/3ELvYb \n \n" + texts.capitanReg +
      "\n \nДля подтверждения участия мы позвоним вашему капитану за 2-3 дня до кибер-турнира. Удачи на SkyNet GAMES!",

    commandMemberCount: 2,
    webAppUrl: "https://skynetgamesbot.ru/game",
    anoncedPost: "https://t.me/games_skynet/486",
    anonced: "cs",
    type: "game"
  },
]
