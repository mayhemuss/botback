import {bot} from "../index.js";

export const editMessages = async (chatId, message_id, inline_keyboard, text, photo = undefined) => {
  const lastForm = {
    chat_id: chatId,
    message_id: +message_id - 1
  }

  const form = {
    chat_id: chatId,
    message_id,
    reply_markup: {
      inline_keyboard
    },
    parse_mode: 'Markdown',
  }

  if (photo) {
    try {
      await bot.editMessageMedia({
          type: "photo",
          media: photo
        },
        lastForm
      )
    } catch (e) {
    }
  }

  try {
    await bot.editMessageText(text, form)
  } catch (e) {
    const newform = {
      chat_id: chatId,
      message_id,
      reply_markup: {
        inline_keyboard
      },

    }
    await bot.editMessageText(text, newform)
  }


}
