import {BOT_NAME} from "./tokens/url.js";
import {rawQueryToString} from "./functions/rawQueryToString.js";
import {codeText} from "./functions/codeDecode.js";
import DisciplineService from "./services/DisciplineService.js";
import UserRegService from "./services/UserRegService.js";

export const sky_logo = "https://sun9-36.userapi.com/impg/5wsa0laxsuOBStXoQTHxvyy1WXL1x9XWQgguhg/fpeANuWJtRc.jpg?size=1920x1080&quality=95&sign=484509bab898750662d9f9e780afc5b5&type=album"

const memberCountWord = {
  "1": "оставшегося одного члена",
  "2": "оставшихся двух членов",
  "3": "оставшихся трех членов",
  "4": "оставшихся четырех членов",
};

export const texts = {
  mixMenu: "Зарегистрируйтесь что бы принять участие в турнире",
  subsribeText: 'Для продолжения работы необходимо подписаться на канал\n' +
    '\n' +
    'https://t.me/games_skynet',
  regionNotAlloved: "Участию подлежат только те, кто проживает в городе Санкт-Петербург или Ленинградской обл.\n\n" +
    "Если вы из Санкт-Петербурга, попробуйте выключить VPN и/или " +
    "подключится к домашней Wi-Fi и пройдите регистрацию повторно. \n\nЕсли ты из СПБ, но зарегистрироваться не " +
    "получается, напиши в нашу техническую поддержку: @Sitnikov_vla",
  lotteryTeamFull: "Человек отправивший вам ссылку уже набрал предельное количество приглашений. " +
    "К сожалению, вы не можете быть его приглашенным другом.\n\nНо вы можете зарегистрироваться самостоятельно " +
    "и мы пришлем вам свою реферальную ссылку, тогда вы получите возможность принять участие в Новогоднем Розыгрыше.",
  stillNeedSubscribe: 'Все-таки необходимо подписаться на канал\n' +
    '\n' +
    'https://t.me/games_skynet',
  helloText: "Добро пожаловать в BOT регистрации SkyNet GAMES. Здесь вы можете зарегистрироваться на турниры, изменять состав команды и участвовать в наших розыгрышах. " +
    "SkyNet GAMES - Твой путь в Киберспорт!",
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
  loteryMemberInList: "Вы не можете стать приглашенным другом, так как были подписаны на телеграмм канал SkyNet GAMES ранее. " +
    "\n\nНо вы можете зарегистрироваться самостоятельно и мы пришлем вам вашу реферальную ссылку, " +
    "тогда вы получите возможность принять участие в Новогоднем Розыгрыше.",

  referalText: "Ваш друг будет зарегистрирован в Новогоднем конкурсе только после прохождения регистрации! \n" +
    "Для вашего участия в розыгрыше - пригласите не менее 2х друзей по персональной реферальной ссылке.  \n" +
    "Персональная реферальная ссылка придет вам после прохождения регистрации.",

  gameReferalText: (commandName, gameName) => {
    return `Регистрация как член команды ${commandName} по ${gameName}`
  },

  loteryRegDone: (name) => {
    return `Спасибо за регистрацию, ${
        name
      }. Сейчас мы пришлем вам реферальную ссылку, через нее вы приглашаете друзей. ` +
      `Важно: приглашенные друзья также должны пройти регистрацию в боте! ` +
      `Минимальное количество приглашенных друзей - 2 человека!`
  },
  loteryRefUrl: (ref, callData) => {
    const RawReg = `${ref}_${callData}`
    return `Ваша персональная реферальная ссылка для приглашения:  ${BOT_NAME}?start=${
        codeText(RawReg)
      }, После перехода по ссылке откроется SkyNet GAMES BOT, не забудьте предупредить друзей, что им также ` +
      `необходимо пройти регистрацию. Данное правило обязательно, без его выполнения, вы не будете зарегистрированы как участник.`
  },
//
  loteryAccept: "Двое человек зарегистрировались по вашей ссылке. " +
    "Поздравляем вас с успешным выполнением всех условий для участия в Новогоднем розыгрыше. " +
    "Ждите результатов розыгрыша в телеграм канале",

  capitanRegDone: (name, commandName, memberCount) => {
    return `Спасибо за регистрацию, ${name}. Сейчас Вам, как капитану команды ${commandName
    } придет сообщение с реферальной ссылкой для ${memberCountWord[String(+memberCount - 1)]
    } вашей команды, не потеряйте его 👇👇👇`
  },
  refUrl: (ref, callData, commandName, gameName) => {
    const RawReg = `${ref}_${callData}`

    return `Участники команды ${commandName} по ${
      gameName
    }, для регистрации вам необходимо сначала подписаться на канал https://t.me/games_skynet , после чего перейти по реферальной ссылке: ${
      BOT_NAME}?start=${
      codeText(RawReg)
    } и ввести свои данные`
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

  lotteryReferalForm: (webAppUrl, data) => {
    const query = rawQueryToString(data)
    return {
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Регистрация как реферал",
            web_app: {
              url: `${webAppUrl}?${query}`
            }
          }]]
      }
    }
  },

  gameReferalForm: (webAppUrl, data) => {
    const query = rawQueryToString(data)
    return {
      reply_markup: {
        inline_keyboard: [
          [{
            text: "Зарегистрировать своего друга участником",
            web_app: {
              url: `${webAppUrl}?${query}`
            }
          }],
        ]
      }

    }
  }

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

  const query = rawQueryToString(rawQuery)

  return [
    [{
      text: `Регламент ${gameName}`,
      callback_data: `${callData}_reglament`
    }],
    [{
      text: regText,
      web_app: {
        url: `${webAppUrl}?${query}`,
        data: regText
      }
    }],
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}

export const bigTeam = (gameName, prevMenu, callData, mix) => {

  return [
    [{
      text: `Регламент ${gameName}`,
      callback_data: `${callData}_reglament`
    }],
    [{
      text: `Капитан команды / Команда`,
      callback_data: callData + "_capitan"
    }],
    [{
      text: `Зарегистрироваться как член команды`,
      callback_data: callData + "_user"

    }],
    [{
      text: mix ? "Регистрация в режиме MiX" : `У меня нет команды 😢`,
      callback_data: mix ? callData + "_mix" : callData + "_noComand",

    }],

    [{
      text: "Проблемы с регистрацией",
      callback_data: callData + "_problems"
    }]
    ,
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}

export const mixTeam = (gameName, prevMenu, callData, nick) => {

  return [
    [{
      text: `Регламент ${gameName}`,
      callback_data: `${callData}_reglament`
    }],
    [{
      text: `Регистрация`,
      callback_data: `${callData}_${nick ? "regpage" : "regconf"}`
    }],
    [{
      text: "Проблемы с регистрацией",
      callback_data: callData + "_problems"
    }]
    ,
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}

export const lottery = async (gameName, prevMenu, callData, webAppUrl, rawQuery, chatId) => {
  const disciplineId = await DisciplineService.createOrGet(callData, gameName, "lottery", callData.split("_")[1])
  const user = await UserRegService.getUser(disciplineId, chatId)
  const regText = user ? "Изменить данные" : `Получить реферальную ссылку`
  const query = rawQueryToString(rawQuery)

  return [
    // [{
    //   text: `Регламент ${gameName}`,
    //   callback_data: `${callData}_reglament`
    // }],
    [{
      text: regText,
      web_app: {
        url: `${webAppUrl}?${query}`,
      }
    }],
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}


export const capitanTeam = (count, commandName, prevMenu, callData, webAppUrl, rawQuery) => {
  const query = rawQueryToString(rawQuery)
  return [
    [{
      text: "Изменить регистрастрационные данные",
      web_app: {
        url: `${webAppUrl}?${query}`,
        // url: `${webAppUrl}`,
      }
    }],
    [{
      text: "Список участников команды",
      callback_data: callData + "_comand"
    }],
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}


export const capitanRegConfirm = (rawQuery, gameName, callData, regText, webAppUrl, prevMenu) => {
  const query = rawQueryToString(rawQuery)

  return [
    [{
      text: regText,
      web_app: {
        url: `${webAppUrl}?${query}`,
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

export const mixRegMenu = (rawQuery, regText, webAppUrl, prevMenu) => {
  const query = rawQueryToString(rawQuery)
  return [
    [{
      text: regText,
      web_app: {
        url: `${webAppUrl}?${query}`,
        data: regText
      }
    }],
    [{
      text: "<<- Назад",
      callback_data: prevMenu
    }]
  ]
}


