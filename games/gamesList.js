import {texts} from "../text.js";

export const gamesList = [


  {
    gameName: "Dota 2",
    dateStart: +(new Date(2024, 11 - 1, 28, 17 - 3, )),
    dateEnd: +(new Date(2024, 12 - 1, 13, 23 - 3, 55)),
    descriptions: "Регистрация на новый турнир по Dota 2, вы можете зарегистрироваться как командой, так и в соло в режиме MiX",
    registrationSheets: "dota_15_12_24_1",
    imageUrl: "https://sun9-78.userapi.com/impg/bmQwcIv1RnHNSXkKN1xI7NBXjK9Ql1NdHSQUxg/9KZyy3gUJy8.jpg?size=1920x1080&quality=95&sign=732b961d5ab6de57736156f6e3e72050&type=album",
    inAppimageUrl: "https://sun9-28.userapi.com/impg/cywL8fuFRvo14aaOlFQIF-z7TrKn30zQAvOsmw/KBMfKd-thmY.jpg?size=1080x1920&quality=96&sign=c2e8e863b94d0c5eb7d73b3950143f3d&type=album",
    reglaments: "С Регламентом турнира по Dota 2 можно ознакомится по данной ссылке: https://clck.ru/3Et5gg",
    commandMemberCount: 5,
    // webAppUrl: "https://frontdev.mayhemus.keenetic.pro/game",
    webAppUrl: "https://skynetgamesbot.ru/game",
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
]
