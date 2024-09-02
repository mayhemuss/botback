import {texts} from "../text.js";

export const gamesList = [
  {
    gameName: "Valorant",
    dateStart: +(new Date(2024, 8, 5, 15 - 3,)),
    dateEnd: +(new Date(2024, 8, 14, 13 - 3,)),
    descriptions: `Регистрация на новый турнир по Valorant, Выбери как зарегистрироваться, ` +
      "как капитан команды или как член команды?",
    registrationSheets: "Valorantreg15_09_24",
    imageUrl: "https://sun9-10.userapi.com/impg/VRViQ9AoEKkQUt4osvUKZejGRnlgJv-swUL62g/wZotEI5Pmw8.jpg?size=1920x1080&quality=95&sign=c20d66cb74f314a67147e82eeef96581&type=album",
    reglaments: `С Регламентом турнира по Valorant можно ознакомится по данной ссылке: https://clck.ru/3CvSqM \n \n` + texts.capitanReg +
      "\n \nДля подтверждения участия мы позвоним вашему капитану за 2-3 дня до кибер-турнира. Удачи на SkyNet GAMES!",
    commandMemberCount: 5,
    webAppUrl: "https://skynetgamesbot.ru/app",
    anonced: "valorant",
    anoncedPost: "https://t.me/games_skynet/",
    type: "game"
  },
  // {
  //   gameName: "Iphone",
  //   dateStart: +(new Date(2024, 8, 15, 15 - 3,)),
  //   dateEnd: +(new Date(2024, 8, 30, 13 - 3,)),
  //   descriptions: 'Пригласи трех друзей, которые небыли подписаны на SkyNet Games и получи шанс выйграть айфон',
  //   registrationSheets: "IphoneReg30_09_24",
  //   newMemberSheets: "IphoneNewMemberReg30_09_24",
  //   imageUrl: "https://3dnews.ru/assets/external/illustrations/2023/09/19/1093280/iPhone15_02.jpg",
  //   reglaments: `Гога тут щас напишет невьебаться какой текст с регламентом конкурса на айфоны`,
  //   commandMemberCount: 3,
  //   webAppUrl: "https://skynetgamesbot.ru/iphone",
  //   anonced: "iphone",
  //   anoncedPost: "https://t.me/games_skynet/",
  //   type: "lottery"
  // },
]
