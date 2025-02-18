import {FRONT_URL} from "../tokens/url.js";

export const gamesList = [

  {
    gameName: "Valorant",
    dateStart: +(new Date(2025, 2 - 1, 14, 18 - 3,)),
    dateEnd: +(new Date(2025, 3 - 1, 13, 23 - 3, 55)),
 //   callData: "dota_30_01_2025",
    descriptions: "Регистрация на новый турнир по Valorant, вы можете зарегистрироваться как командой, так и в соло в режиме MiX",
    registrationSheets: "dota_30_01_25",
    imageUrl: `${FRONT_URL}/api/static/valorant_23_03_1.jpg`,
    inAppimageUrl: `${FRONT_URL}/api/static/valorant_inApp.jpg`,
    reglaments: "С Регламентом турнира по Valorant можно ознакомится по данной ссылке: https://clck.ru/3GTQCt",
    commandMemberCount: 5,
    webAppUrl: `${FRONT_URL}/game`,
    anoncedPost: "https://t.me/games_skynet/1",
    anonced: "valorant",
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
        placeholder: "Ранг",
        name: "rating",
        title: "Ваш Ранг:",
        minCheck: 3,
        maxCheck: 25,
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
      {
        textType: "textarea",
        placeholder: "Riot id",
        name: "steamName",
        title: "Ваш Riot id:",
        minCheck: 1,
        maxCheck: 40,
        validator: "[^⌂]+$",
        isBeDisable: true
      },
    ]
  },
  // {
  //   gameName: "Counter-Strike 2",
  //   dateStart: +(new Date(2025, 1 - 1, 14, 18 - 3,)),
  //   dateEnd: +(new Date(2025, 1 - 1, 1, 23 - 3, 55)),
  // //  callData: "cs_30_01_2025",
  //   descriptions: "Регистрация на новый турнир по Counter-Strike 2, вы можете зарегистрироваться как командой, так и в соло в режиме MiX",
  //   registrationSheets: "cs_30_01_25",
  //   imageUrl: "https://sun9-27.userapi.com/impg/-k72_HvNdeRBBug_r00bUbR3Y3vAgvEpcVys-w/KRIUWiaGrMQ.jpg?size=1920x1080&quality=95&sign=5cba643acbb689bf0393855a8fcc9f4e&type=album",
  //   inAppimageUrl: "https://sun9-48.userapi.com/impg/XqCNP5HpA0mkQOq2c3mxBLzkz2oW3fy7rcrupg/RjMaqf4hVjc.jpg?size=1080x1920&quality=95&sign=b6e03cb44d4d27102cc065422d2bf3f0&type=album",
  //   reglaments: "С Регламентом турнира по Counter-Strike 2 можно ознакомится по данной ссылке: https://clck.ru/3FjKST",
  //   commandMemberCount: 5,
  //   webAppUrl: `${FRONT_URL}/game`,
  //   anoncedPost: "https://t.me/games_skynet/1",
  //   anonced: "cs",
  //   type: "game",
  //   haveMix: true,
  //   specialFields: [
  //     // {
  //     //   textType: "input",
  //     //   placeholder: "Позиция",
  //     //   name: "position",
  //     //   title: "Позиция на которой вы хотите играть (№ от 1 до 5, можно указать несколько):",
  //     //   minCheck: 1,
  //     //   maxCheck: 5,
  //     //   validator: "^[1-5]+$",
  //     //   isBeDisable: false
  //     // }
  //   ],
  //   fields: [
  //     {
  //       textType: "textarea",
  //       placeholder: "Рейтинг",
  //       name: "rating",
  //       title: "Ваш рейтинг:",
  //       minCheck: 3,
  //       maxCheck: 40,
  //       validator: "^[а-яА-Яa-zA-Z\\d \\s]+$",
  //       isBeDisable: false
  //     },
  //     {
  //       textType: "textarea",
  //       placeholder: "Название команды",
  //       name: "commandName",
  //       title: "Название команды:",
  //       minCheck: 1,
  //       maxCheck: 40,
  //       validator: "^[а-яА-Яa-zA-Z\\d \\s]+$",
  //       isBeDisable: true
  //     },
  //   ]
  // },
]
