import TelegramBot from 'node-telegram-bot-api'
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {API_URL, TelegramToken} from "./tokens/token.js";
import {ADMIN_ID, ADMINs_ID, BACK_URL, PORT} from "./tokens/url.js";
import {commands} from "./text.js";
import {msgCallbackQueryHandler} from "./functions/msgCallbackQueryHandler.js";
import {msgTextHandler} from "./functions/msgTextHandler.js";
import db from "./db/db.js";
import newRouter from "./newRouter.js";
import {adminsCommandCheck} from "./functions/textCheck.js";
import {adminsCommand} from "./scenarios/adminsCommand.js";
import {saveMessages} from "./services/saveMessages.js";
import {gamesList} from "./games/gamesList.js";
import UserRegService from "./services/UserRegService.js";
import DisciplineService from "./services/DisciplineService.js";
import {saveToExelArr} from "./services/exelData.js";
import {savetoEXEL} from "./services/savetoEXEL.js";


dotenv.config();

export const bot = new TelegramBot(TelegramToken, {polling: true});

//настройки бэка
const app = express();
app.use(cors());
app.use(express.json({limit: '70mb'}));
app.use(API_URL, newRouter)

const start = async () => {
  //запуск бэка
  try {
    await db.authenticate();

    await db.sync();
  } catch (e) {
    console.log(e)
  }

  try {
    app.listen(PORT, BACK_URL, () => {
      console.log(`server start at https://${BACK_URL}:${PORT}`)
    });
  } catch (error) {
    console.log(error);
  }
  //меню кнопок
  await bot.setMyCommands(commands);

  //проверка текста
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (ADMINs_ID.includes(chatId) && adminsCommandCheck(text)) {
      const command = text.split(" ")[0]
      const body = await adminsCommand[command].callBack(chatId, text);

      return saveMessages(body, chatId);
    }

    await msgTextHandler(msg)
  })
  ;

  //проверка кнопок
  bot.on("callback_query", async (msg) => {
    const callBackData = msg.data
    if(callBackData.startsWith("admin")) {
      return
    }
    await msgCallbackQueryHandler(msg)
  })
  setInterval(async ()=> savetoEXEL(), 1000*60*60)

}


start()
