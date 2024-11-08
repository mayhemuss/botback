
import {Logs} from "../models/models.js";

export const saveMessages = async (body, chatId) => {
  try {
    await Logs.create({
      chatId, body
    })
  } catch (err) {
    console.log(err)
  }


}
