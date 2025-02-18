import {FRONT_URL} from "../tokens/url.js";

export const gamesList = [
  {
    gameName: "Valorant",
    dateStart: +(new Date(2025, 2 - 1, 18, 15 - 3,55)),
    dateEnd: +(new Date(2025, 3 - 1, 13, 23 - 3, 55)),
    descriptions: "Регистрация на новый турнир по Valorant, вы можете зарегистрироваться как командой, так и в соло в режиме MiX",
    registrationSheets: "valorant_23_03_25",
    imageUrl: `${FRONT_URL}/api/static/valorant_23_03_25.jpg`,
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
        placeholder: "Riot id",
        name: "steamName",
        title: "Ваш Riot id:",
        minCheck: 1,
        maxCheck: 40,
        validator: "[^⌂]+$",
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
