import {auth, googleSheets} from "../functions/googleAuth.js";
import {spreadsheetId} from "../tokens/token.js";
import {bot} from "../index.js";
import {saveMessages} from "./saveMessages.js";


export const gameChangeData = async (
  index,
  registrationSheets,

    date,
    phone,
    name,
    subscribe,
    tname,
    username,
    chatId,
    ip
  ) => {
  const NewInd = index + 1
  const Tusername = username ? "https://t.me/" + username : ""
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `${registrationSheets}!A${NewInd}:K${NewInd}`,
    valueInputOption: "RAW",
    resource: {
      values: [[date, phone, name, subscribe, tname, Tusername, String(chatId)]],
    }
  });
  console.log("renew")
  await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
  await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}`, chatId, "bot")
}
