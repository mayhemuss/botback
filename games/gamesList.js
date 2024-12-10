import {FRONT_URL} from "../tokens/url.js";

export const gamesList = [

  {
    gameName: "Новогодний Розыгрыш MLBB",
    dateStart: +(new Date(2024, 11 - 1, 29, 17 - 3,)),
    dateEnd: +(new Date(2025, 1 - 1, 9, 23 - 3, 59)),
    callData: "newYLottery_1733777940000",
    descriptions: 'Новогодний розыгрыш от SkyNet GAMES, совместно с Mobile Legends: Bang Bang & Realme. \n' +
      'Получай реферальную ссылку, приглашай друзей в телеграмм канал SkyNet GAMES и получи возможность выиграть ценных призов, более чем на 100.000 рублей!   \n' +
      ' \n' +
      'Важно:  \n' +
      'Ты должен проживать в Санкт-Петербурге и быть подписан на телеграмм каналы: \n' +
      '[SkyNet GAMES](https://t.me/games_skynet)\n' +
      '[Mobile Legends: Bang Bang](https://t.me/mlbbcis) \n' +
      '[Realme](https://t.me/realmerussia)\n' +
      '\n' +
      'Твои приглашенные друзья должны быть подписаны на SkyNet GAMES.\n' +
      ' \n' +
      'Обязательно, на момент подведения итогов розыгрыша 25.12, должна быть открыта фотография аккаунта Telegram у тебя и твоих приглашенных друзей!  \n' +
      'Запрещено приглашать родителей и родственников.  \n' +
      'Минимальное количество приглашений - 2 человека.  \n' +
      'Не забудь отключить VPN перед регистрацией. \n' +
      'Участники, нарушившие правила, автоматически будут дисквалифицированы.',
    registrationSheets: "сделали_ссылку_айфон30_09_24",
    lotterySheets: "участники_розыгрыша_айфон30_09_24",
    imageUrl: "https://sun9-17.userapi.com/impg/Ge0XhYBBbubdkrsRBbW0fo9nasKrLTytv-uVqA/5_i7xc6FszQ.jpg?size=1920x1080&quality=95&sign=745aea759a58f98e358f9ebb224307df&type=album",
    inAppimageUrl: "https://sun9-74.userapi.com/impg/By1HTs_ny4QCEzwZ_fmakErlIHFmH26QK4K_Lw/HWaAolF_ofw.jpg?size=1080x1920&quality=95&sign=9192b55164becf32e0d84b2f1cc34e3a&type=album",

    commandMemberCount: 2,

    webAppUrl: `${FRONT_URL}/game`,
    anonced: "newYLottery",
    anoncedPost: "https://t.me/games_skynet/",
    type: "lottery",
    fields: []
  },
  {
    gameName: "Saint-P Champ SkyNet GAMES",
    dateStart: +(new Date(2024, 11 - 1, 28, 17 - 3,)),
    dateEnd: +(new Date(2024, 12 - 1, 13, 23 - 3, 55)),
    callData: "dota_1734123300000",
    descriptions: "Регистрация на новый турнир по Dota 2, вы можете зарегистрироваться как командой, так и в соло в режиме MiX",
    registrationSheets: "dota_15_12_24_1",
    imageUrl: "https://sun9-78.userapi.com/impg/bmQwcIv1RnHNSXkKN1xI7NBXjK9Ql1NdHSQUxg/9KZyy3gUJy8.jpg?size=1920x1080&quality=95&sign=732b961d5ab6de57736156f6e3e72050&type=album",
    inAppimageUrl: "https://sun9-28.userapi.com/impg/cywL8fuFRvo14aaOlFQIF-z7TrKn30zQAvOsmw/KBMfKd-thmY.jpg?size=1080x1920&quality=96&sign=c2e8e863b94d0c5eb7d73b3950143f3d&type=album",
    reglaments: "С Регламентом турнира по Dota 2 можно ознакомится по данной ссылке: https://clck.ru/3Et5gg",
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
]
