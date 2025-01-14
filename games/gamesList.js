import {FRONT_URL} from "../tokens/url.js";

export const gamesList = [

  {
    gameName: "Dota 2",
    dateStart: +(new Date(2025, 1 - 1, 14, 18 - 3,)),
    dateEnd: +(new Date(2025, 1 - 1, 30, 23 - 3, 55)),
    callData: "dota_30_01_2025",
    descriptions: "Регистрация на новый турнир по Dota 2, вы можете зарегистрироваться как командой, так и в соло в режиме MiX",
    registrationSheets: "dota_30_01_25",
    imageUrl: "https://sun9-33.userapi.com/impg/IcMm8Ml3P5eQtaiQr9TVJYeDgp0VLtpcjOTCRA/y-rAwb-h7lI.jpg?size=1920x1080&quality=95&sign=fd565d7046b09d671c667d5dc5d63ebc&type=album",
    inAppimageUrl: "https://sun9-28.userapi.com/impg/cywL8fuFRvo14aaOlFQIF-z7TrKn30zQAvOsmw/KBMfKd-thmY.jpg?size=1080x1920&quality=96&sign=c2e8e863b94d0c5eb7d73b3950143f3d&type=album",
    reglaments: "С Регламентом турнира по Dota 2 можно ознакомится по данной ссылке: https://clck.ru/3FjKWv",
    commandMemberCount: 5,
    webAppUrl: `${FRONT_URL}/game`,
    anoncedPost: "https://t.me/games_skynet/1",
    anonced: "dota",
    type: "game",
    haveMix: true,
    specialFields: [
      {
        textType: "input",
        placeholder: "Позиция",
        name: "position",
        title: "Позиция на которой вы хотите играть (№ от 1 до 5, можно указать несколько):",
        minCheck: 1,
        maxCheck: 5,
        validator: "^[1-5]+$",
        isBeDisable: false
      }
    ],
    fields: [
      {
        textType: "textarea",
        placeholder: "Ваш MMR",
        name: "rating",
        title: "Ваш MMR:",
        minCheck: 3,
        maxCheck: 5,
        validator: "^[0-9]+$",
        isBeDisable: false
      },
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
    ]
  },
  {
    gameName: "Counter-Strike 2",
    dateStart: +(new Date(2025, 1 - 1, 14, 18 - 3,)),
    dateEnd: +(new Date(2025, 1 - 1, 30, 23 - 3, 55)),
    callData: "cs_30_01_2025",
    descriptions: "Регистрация на новый турнир по Counter-Strike 2, вы можете зарегистрироваться как командой, так и в соло в режиме MiX",
    registrationSheets: "cs_30_01_25",
    imageUrl: "https://sun9-27.userapi.com/impg/-k72_HvNdeRBBug_r00bUbR3Y3vAgvEpcVys-w/KRIUWiaGrMQ.jpg?size=1920x1080&quality=95&sign=5cba643acbb689bf0393855a8fcc9f4e&type=album",
    inAppimageUrl: "https://sun9-48.userapi.com/impg/XqCNP5HpA0mkQOq2c3mxBLzkz2oW3fy7rcrupg/RjMaqf4hVjc.jpg?size=1080x1920&quality=95&sign=b6e03cb44d4d27102cc065422d2bf3f0&type=album",
    reglaments: "С Регламентом турнира по Counter-Strike 2 можно ознакомится по данной ссылке: https://clck.ru/3FjKST",
    commandMemberCount: 5,
    webAppUrl: `${FRONT_URL}/game`,
    anoncedPost: "https://t.me/games_skynet/1",
    anonced: "cs",
    type: "game",
    haveMix: true,
    specialFields: [
      // {
      //   textType: "input",
      //   placeholder: "Позиция",
      //   name: "position",
      //   title: "Позиция на которой вы хотите играть (№ от 1 до 5, можно указать несколько):",
      //   minCheck: 1,
      //   maxCheck: 5,
      //   validator: "^[1-5]+$",
      //   isBeDisable: false
      // }
    ],
    fields: [
      {
        textType: "textarea",
        placeholder: "Рейтинг",
        name: "rating",
        title: "Ваш рейтинг:",
        minCheck: 3,
        maxCheck: 40,
        validator: "^[а-яА-Яa-zA-Z\\d \\s]+$",
        isBeDisable: false
      },
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
    ]
  },
]
