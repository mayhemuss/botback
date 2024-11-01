import {BOT_NAME} from "../tokens/url.js";

export const codeText = (RawReg) => {
  const buff = Buffer.from(RawReg);
  return buff.toString('base64')
}
export const decodeText = (ciphertext) => {
  let buff = Buffer.from(ciphertext, 'base64');
  return buff.toString('utf-8')
}

