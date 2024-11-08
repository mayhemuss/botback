import {texts} from "../text.js";

export const gamesList = [

  {
    gameName: "Counter-Strike 2 \"2x2\"",
    dateStart: +(new Date(2024, 11 - 1, 1, 17 - 3, 25)),
    dateEnd: +(new Date(2024, 11 - 1, 15, 23 - 3, 59)),
    descriptions: "Регистрация на новый турнир по Counter-Strike 2 \"2x2\", Выбери как зарегистрироваться, " +
      "как капитан команды или как член команды?",
    registrationSheets: "cs_17_11_24",
    imageUrl: "https://sun9-50.userapi.com/impg/iMq8QN6bufDab5J17SAutQN3uqm15W0d29pNeQ/AVYrwhpWUO4.jpg?size=1920x1080&quality=95&sign=c6485f43735ef269f9f9c2414c886316&type=album",
    inAppimageUrl: "https://sun9-48.userapi.com/impg/XqCNP5HpA0mkQOq2c3mxBLzkz2oW3fy7rcrupg/RjMaqf4hVjc.jpg?size=1080x1920&quality=95&sign=b6e03cb44d4d27102cc065422d2bf3f0&type=album",
    reglaments: "С Регламентом турнира по Counter-Strike 2 \"2x2\" можно ознакомится по данной ссылке: https://clck.ru/3ELvYb \n \n" + texts.capitanReg +
      "\n \nДля подтверждения участия мы позвоним вашему капитану за 2-3 дня до кибер-турнира. Удачи на SkyNet GAMES!",
    commandMemberCount: 2,
    webAppUrl: "https://frontdev.mayhemus.keenetic.pro/game",
    // webAppUrl: "https://skynetgamesbot.ru/game",
    anoncedPost: "https://t.me/games_skynet/486",
    anonced: "cs",
    type: "game",

    fields: [
      {
        textType: "textarea",
        placeholder: "Название команды",
        name: "commandName",
        title: "Название команды:",
        minCheck: 1,
        maxCheck: 40,
        validator: "^[а-яА-Яa-zA-Z\\d \\s]+$",
        isBeDisable: true

      },
      {
        textType: "textarea",
        placeholder: "Ваш рейтинг",
        name: "rating",
        title: "Ваш рейтинг в игре:",
        minCheck: 3,
        maxCheck: 10,
        validator: "^[а-яА-Яa-zA-Z\\d \\s]+$",
        isBeDisable: false
      }
    ]
  },
  {
    gameName: "Iphone",
    dateStart: +(new Date(2024, 7, 15, 15 - 3,)),
    dateEnd: +(new Date(2024, 12 - 1, 30, 13 - 3,)),
    descriptions: 'Пригласи трех друзей, которые небыли подписаны на SkyNet Games и получи шанс выйграть айфон',
    registrationSheets: "сделали_ссылку_айфон30_09_24",
    lotterySheets: "участники_розыгрыша_айфон30_09_24",
    imageUrl: "https://3dnews.ru/assets/external/illustrations/2023/09/19/1093280/iPhone15_02.jpg",
    inAppimageUrl: "https://hetamobiler.se/wp-content/uploads/2012/09/vit-iphone5.jpg",
    reglaments: `Гога тут щас напишет невьебаться какой текст с регламентом конкурса на айфоны`,
    commandMemberCount: 3,
    // webAppUrl: "https://frontdev.mayhemus.keenetic.pro/lottery",
    // webAppUrl: "https://skynetgamesbot.ru/lottery",

    webAppUrl: "https://frontdev.mayhemus.keenetic.pro/game",
    anonced: "iphone",
    anoncedPost: "https://t.me/games_skynet/",
    type: "lottery",
    fields: [
      {
        textType: "textarea",
        placeholder: "имя в стиме",
        name: "steamName",
        title: "имя в стиме: ",
        minCheck: 1,
        maxCheck: 40,
        validator: "",
        isBeDisable: true

      },
    ]
  },
  {
    gameName: "Counter-Strike 2 MiX",
    dateStart: +(new Date(2024, 11 - 1, 1, 17 - 3, 25)),
    dateEnd: +(new Date(2025, 1 - 1, 15, 23 - 3, 59)),
    descriptions: "Регистрация на новый турнир по Counter-Strike 2 MiX, Выбери как зарегистрироваться, " +
      "пройдите регистрацию, после чего система выберет вам членов команды в зависимости от их рейтинга",
    registrationSheets: "cs_15_12_24",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCbxlZiMB6tkxLTfDqnvuku4m0-f-7kkPQgA&s",
    inAppimageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/CS2_Cover_Art.jpg/220px-CS2_Cover_Art.jpg",
    reglaments: "С Регламентом турнира по Counter-Strike 2 MiX можно ознакомится по данной ссылке: https://google.com/",
    commandMemberCount: 5,
    webAppUrl: "https://frontdev.mayhemus.keenetic.pro/game",
    // webAppUrl: "https://skynetgamesbot.ru/game",
    anoncedPost: "https://t.me/games_skynet/1",
    anonced: "cs",
    type: "mix",

    fields: [

      {
        textType: "textarea",
        placeholder: "Ваш рейтинг",
        name: "rating",
        title: "Ваш рейтинг в игре:",
        minCheck: 3,
        maxCheck: 10,
        validator: "^[а-яА-Яa-zA-Z\\d \\s]+$",
        isBeDisable: false
      }
    ]
  }
]
