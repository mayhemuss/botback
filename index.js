import TelegramBot from 'node-telegram-bot-api'
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {API_URL, TelegramToken} from "./tokens/token.js";
import router from "./router.js";
import {BACK_URL, PORT} from "./tokens/url.js";
import {commands} from "./text.js";
import {msgCallbackQueryHandler} from "./functions/msgCallbackQueryHandler.js";
import {msgTextHandler} from "./functions/msgTextHandler.js";


dotenv.config();

export const bot = new TelegramBot(TelegramToken, {polling: true});

//настройки бэка
const app = express();
app.use(cors());
app.use(express.json({limit: '70mb'}));
app.use(API_URL, router)

const start = async () => {
  //запуск бэка
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
    await msgTextHandler(msg)
  })
  ;

  //проверка кнопок
  bot.on("callback_query", async (msg) => {
    await msgCallbackQueryHandler(msg)
  })
}


start()
