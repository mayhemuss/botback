import {texts} from "../text.js";

export const gamesList = [

  {
    gameName: "Counter-Strike 2",
    dateStart: +(new Date(2024, 10 - 1, 11, 16 - 3,55)),
    dateEnd: +(new Date(2024, 11 - 1, 1, 23 - 3, 59)),
    descriptions: "Регистрация на новый турнир по Counter-Strike 2, Выбери как зарегистрироваться, " +
      "как капитан команды или как член команды?",
    registrationSheets: "cs_03_11_24",
    imageUrl: "https://sun9-77.userapi.com/impg/CyQywdt9M-WQB4ZrFG4OmZwO2p44uFmklZRs3w/eBn7jNz5__8.jpg?size=1920x1080&quality=95&sign=35e195be07bf311a793ea6a214ad8e4c&type=album",
    reglaments: "С Регламентом турнира по Counter-Strike 2 можно ознакомится по данной ссылке: https://clck.ru/3Dq7hp \n \n" + texts.capitanReg +
      "\n \nДля подтверждения участия мы позвоним вашему капитану за 2-3 дня до кибер-турнира. Удачи на SkyNet GAMES!",

    commandMemberCount: 5,
    webAppUrl: "https://skynetgamesbot.ru/game",
    anoncedPost: "https://t.me/games_skynet/482",
    anonced: "cs",
    type: "game"
  },
]
