import {BOT_NAME} from "./tokens/url.js";
import {rawQueryToString} from "./functions/rawQueryToString.js";
import {codeText} from "./functions/codeDecode.js";

export const sky_logo = "https://sun9-36.userapi.com/impg/5wsa0laxsuOBStXoQTHxvyy1WXL1x9XWQgguhg/fpeANuWJtRc.jpg?size=1920x1080&quality=95&sign=484509bab898750662d9f9e780afc5b5&type=album"

const memberCountWord = {
  "1": "оставшегося одного члена",
  "2": "оставшихся двух членов",
  "3": "оставшихся трех членов",
  "4": "оставшихся четырех членов",
}

export const texts = {
  subsribeText: 'Для продолжения работы необходимо подписаться на канал\n' +
    '\n' +
    'https://t.me/games_skynet',
  stillNeedSubscribe: 'Все-таки необходимо подписаться на канал\n' +
    '\n' +
    'https://t.me/games_skynet',
  helloText: "Добро пожаловать в БОТ регистрации на кибер-турниры от SkyNet GAMES. " +
    "Здесь вы можете ознакомиться с представленными дисциплинами, " +
    "а также зарегистрироваться на ближайшие мероприятия SkyNet GAMES.",
  AwaitText: "Добро пожаловать в БОТ регистрации на кибер-турниры от SkyNet GAMES. " +
    "Сейчас мы готовим анонсы новых мероприятий, ожидайте новостей на канале https://t.me/games_skynet",
  allBad: 'что то пошло не так',
  userReg: "Что бы зарегистрироваться как член команды, необходимо выбрать капитана команды. " +
    "Капитан команды должен пройти регистрацию и прислать вам реферальную ссылку. " +
    "Перейдя по ней появится возможность зарегистрироваться как участник его команды.",
  capitanReg: "Для регистрации команды на турнир необходимо выбрать капитана команды, он должен зарегистрироваться первым. " +
    "После его регистрации ему придет сообщение с реферальной ссылкой для остальных членов команды. " +
    "Капитан должен отправить эту ссылку остальным участникам команды. " +
    "Участники перейдя по ссылке получат возможность зарегистрироваться на турнир как члены данной команды. " +
    "Для регистрации на турнире все участники команды должны быть подписаны на канал https://t.me/games_skynet",
  capitanRegConf: "Подтвердите свою регистрацию как капитан. " +
    "После регистрации как капитан будет невозможно зарегистрироваться как участник другой команды! " +
    "Внимательно пишите название команды, после регистрации его смена не возможна",

  capitanRegDone: (name, commandName, memberCount) => {
    return `Спасибо за регистрацию, ${name}. Сейчас Вам, как капитану команды ${commandName
    } придет сообщение с реферальной ссылкой для ${memberCountWord[String(+memberCount - 1)]
    } вашей команды, не потеряйте его 👇👇👇`
  },
  refUrl: (ref, callData, commandName, gameName) => {
    const RawReg = `${ref}_${callData}`
    return `Участники команды ${commandName} по ${gameName}, вот ваша ссылка для регистрации в команду: ${BOT_NAME}?start=${
      codeText(RawReg)
    }, перейдите по ней и введите свои данные.`
  },
  registrationDone: (commandName, gameName) => {
    return `Участники команды ${commandName}, поздравляем вас с успешной регистрацией команды на турнире по ${
      gameName
    }!!! Играй и побеждай вместе со SkyNet GAMES.`
  },
}

export const forms = {

  subscribeForm: {
    reply_markup: {
      inline_keyboard: [
        [{text: "Подписался!", callback_data: "Подписался!"}],
      ]
    }
  },

}

export const gameVariantsText = {
  mlbb: ["ml:bb", "мобайл", "legends", "мобл", "млбб", "mlbb"],
  cs: ["cs2", "контра", "cs:2", "counter", "strike"],
  dota: ["dota", "дота", "доте", "Dota 2"],
  valorant: ["valor", "валор", "валик", "valik", "Valorant"],
  swear_words: ["жопа", "хуй", "гавно", "пидор", "гандон", "гондон", "ебан", "ёба", "шалав", "залуп"]
}


export const searchGameText = {
  valorant: "Не переживайте, в ближайшее время мы проведем турнир по Valorant, следите за новостями в телеграмм канале SkyNet GAMES.",
  dota: "Не переживайте, в ближайшее время мы проведем турнир по Dota 2, следите за новостями в телеграмм канале SkyNet GAMES.",
  mlbb: "Не переживайте, в ближайшее время мы проведем мероприятие по Mobile Legends: Bang Bang, следите за новостями в телеграмм канале SkyNet GAMES.",
  cs: "Не переживайте, в ближайшее время мы проведем турнир по Counter-Strike 2, следите за новостями в телеграмм канале SkyNet GAMES.",
  swear_words: "Очень не культурно, просьба больше так не писать.",
  searchNothingText: "Вся информация о ближайших мероприятиях в телеграмм канале SkyNet GAMES. \n" +
    "За дополнительной информацией, обращайтесь в комментарии или к @smkmn_GS"
}

export const commands = [
  {
    command: "start",
    description: "Запуск бота"
  },
]


export const smallTeam = (gameName, prevMenu, regText, rawQuery, webAppUrl, callData) => {

  const {query, lenght} = rawQueryToString(rawQuery)

  return [
    [{
      text: `Регламент ${gameName}`,
      callback_data: `${callData}_reglament`
    }],
    [{
      text: regText,
      web_app: {
        url: `${webAppUrl}${lenght}${query}`,
        data: regText
      }
    }],
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}

export const bigTeam = (gameName, prevMenu, callData) => {

  return [
    [{
      text: `Регламент ${gameName}`,
      callback_data: `${callData}_reglament`
    }],
    [{
      text: `Зарегистрироваться как капитан`,
      callback_data: callData + "_capitan"
    }],
    [{
      text: `Зарегистрироваться как член команды`,
      callback_data: callData + "_user"

    }],
    [{
      text: `У меня нет команды 😢`,
      callback_data: callData + "_noComand"

    }]
    ,
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}

export const capitanRegConfirm = (rawQuery, gameName, callData, regText, webAppUrl, prevMenu) => {
  const {lenght, query} = rawQueryToString(rawQuery)

  return [
    [{
      text: regText,
      web_app: {
        url: `${webAppUrl}${lenght}${query}&regType=capitan`,
        data: regText
      }
    }],
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}

export const userRegConfirm = (prevMenu) => {
  return [
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}

