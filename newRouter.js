import Router from "express";
import {saveMessages} from "./services/saveMessages.js";
import {gamesList} from "./games/gamesList.js";
import {bot} from "./index.js";
import {timeCheck} from "./functions/timeCheck.js";
import {ADMIN_ID} from "./tokens/url.js";
import UserRegService from "./services/UserRegService.js";
import UserController from "./UserController.js";
import {texts} from "./text.js";
import DisciplineService from "./services/DisciplineService.js";
import {userids} from "./userids.js";


const newRouter = new Router();

newRouter.post("/type",
  async (req, res) => {
    const messageToSave = {nginxIp: req.ip}
    console.log(req.ip)
    try {
      const {ref, callData, chatId} = req.body;

      const result = {};
      messageToSave.body = {ref, callData, chatId}
      const game = timeCheck(gamesList).filter(game => {
        return game.callData === callData
      })[0]

      const commandMemberCount = game.commandMemberCount

      result.inAppimageUrl = game.inAppimageUrl
      result.commandMemberCount = commandMemberCount

      const discipline = await DisciplineService.get(callData)
      const user = await UserRegService.getUser(discipline.id, chatId)

      if (commandMemberCount > 1 && game.type === "game") {

        if (ref !== chatId && ref !== undefined) {
          const command = await UserRegService.getCommand(discipline.id, +ref)

          result.commandName = command[0].commandName
        }
      }
      if (game.type === "game") {
        result.regText = user ? "Изменить данные" : "Зарегистрироваться"
      } else {
        result.regText = user ? "Изменить данные" : "Получить реферальную ссылку"
      }

      messageToSave.result = result
      res.json(result)
      return await saveMessages(JSON
        .stringify({...messageToSave, answer: "открыл страницу регистрации"}), chatId)


    } catch (e) {
      console.log(e)
      return res.json(e);
    }
  })

newRouter.post("/regis",
  async (req, res) => {

    const {
      date,
      phone,
      name,
      subscribe,
      chatId: idchat,
      tname,
      username,
      regType,
      ref,
      callData,
      commandName,
      steamName,
      ip,
      rating
    } = req.body;
    const chatId = +idchat


    try {
      await saveMessages(JSON.stringify(req.body), chatId, "bot")
      // await saveMessages(`отправил данные, телефон - ${phone}, имя - ${name}`, chatId)
      const [anonced, dateEnd] = await callData.split("_")

      //список игр
      const games = timeCheck(gamesList).filter(game => {
        return game.anonced === anonced && game.callData
      })

      //нет игр
      if (games.length === 0) {
        res.json({message: "done"})
        await bot.sendMessage(chatId, "Регистрация на мероприятие уже была окончена")
        return await res.json({done: "done"})
      }

      //игра
      const {
        registrationSheets,
        gameName,
        callData: callDataInGame,
        lotterySheets,
        type,
        commandMemberCount,
        dateEnd: date
      } = games[0]

      const disciplineId = await DisciplineService.createOrGet(callData, gameName, type, date)

      const responce = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`)
      const {city, region, country} = await responce.json()
      const user = await UserRegService.getUser(disciplineId, chatId)
      //регистрация на игры
      if (type === "game") {


        if (commandMemberCount > 1) {
          if (regType === "capitan") {
            const newReg = await UserController.CreateOrUpdate(user, disciplineId, +chatId, tname, username, ref, commandName, regType, ip, city, region, country, phone, name, false, null, rating)
            if (newReg) {
              await bot.sendMessage(chatId, texts.capitanRegDone(name, commandName, commandMemberCount))
              await bot.sendMessage(chatId, texts.refUrl(chatId, callDataInGame, commandName, gameName))
              await saveMessages(`имя= ${name} телефон = ${phone} ip= ${ip}` + `Спасибо за регистрацию, ${name}. реферальная ссылка ${texts.refUrl(chatId, callDataInGame, commandName, gameName)}`, chatId, "bot")
            } else {
              await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
            }

            //усли не капитан
          } else {

            //битая ссылка
            if (ref === "undefined") {
              await saveMessages("битая реф ссылка", chatId, "bot")
              await bot.sendMessage(chatId, "Произошла техническая ошибка, сейчас я свяжусь с вашим капитаном и мы ее исправим")
              await bot.sendMessage(ADMIN_ID, "битая ссылка у " + chatId)
              return await res.json({done: "done"})
            }

            const command = await UserRegService.getCommand(disciplineId, ref)

            //если команда расформирована
            if (command.length === 0) {
              await bot.sendMessage(chatId, "Капитапн команды расформировал команду")
              return await res.json({done: "done"});
            }

            //команда не полна
            if (command.length < commandMemberCount) {
              const newReg = await UserController.CreateOrUpdate(user, disciplineId, +chatId, tname, username, ref, commandName, regType, ip, city, region, country, phone, name, false, null, rating)

              if (newReg) {
                await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
              } else {
                await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
              }

              //команда заполнилась
              if (command.length + 1 === commandMemberCount) {

                //ид команды
                const commandIds = command.map(member => {
                  return member.chatId
                })
                //имя команды
                const comName = command[0].commandName

                for (const id of [...commandIds, chatId]) {
                  try {
                    await bot.sendMessage(id, texts.registrationDone(comName, games[0].gameName))
                  } catch (e) {
                    console.log(e)
                  }
                }
                await saveMessages(JSON.stringify({
                  command: [...commandIds, chatId],
                  answer: "Команда собралась"
                }), chatId, "bot")
              }

              //если команда набрана
            } else {
              const commandIds = command.map(user => {
                return user.chatId
              })
              // если член команды
              if (commandIds.includes(chatId)) {
                const newReg = await UserController.CreateOrUpdate(user, disciplineId, +chatId, tname, username, ref, commandName, regType, ip, city, region, country, phone, name, false, null, rating)
                if (newReg) {
                  await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
                } else {
                  await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
                }

                //если новый пытался
              } else {
                await bot.sendMessage(chatId, "Команда уже набрана")
              }
            }


          }

        } else {
          const newReg = await UserController.CreateOrUpdate(user, disciplineId, +chatId, tname, username, ref, commandName, regType, ip, city, region, country, phone, name)
          if (newReg) {
            await bot.sendMessage(chatId, `Спасибо за регистрацию, ${name}.`)
          } else {
            await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
          }
        }
      }

      if (type === "lottery") {
        if (ref === "undefined") {
          await saveMessages("битая реф ссылка", chatId, "bot")
          await bot.sendMessage(chatId, "Произошла техническая ошибка, данная реферальная ссылка не работает.")
          await bot.sendMessage(ADMIN_ID, "битая ссылка у " + chatId)
          return await res.json({done: "done"})
        }


        if (region === "Санкт-Петербург" || city === "Санкт-Петербург" || region === "Ленинградская область") {

          //первичная рега кэпа подпивасов
          if (ref === chatId || ref === "") {
            const newReg = await UserController
              .CreateOrUpdate(user, disciplineId, +chatId, tname, username, ref, commandName, regType, ip, city, region, country, phone, name, false, steamName)
            if (newReg) {
              await bot.sendMessage(chatId, texts.loteryRegDone(name))
              await bot.sendMessage(chatId, texts.loteryRefUrl(chatId, callDataInGame))
            } else {
              await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
            }

            //регистрация подпиваса
          } else {

            //если пытается зарегаться подпивасом, но уже был подписан
            if (userids.includes(chatId)) {
              const newReg = await UserController
                .CreateOrUpdate(user, disciplineId, +chatId, tname, username, +chatId, commandName, regType, ip, city, region, country, phone, name, false, steamName)
              if (newReg) {
                await bot.sendMessage(chatId, texts.loteryMemberInList)
                await bot.sendMessage(chatId, texts.loteryRegDone(name))
                await bot.sendMessage(chatId, texts.loteryRefUrl(chatId, callDataInGame))
              } else {
                await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
              }
              return await res.json({done: "done"})
            }

            const command = await UserRegService.getCommand(disciplineId, ref)

            const beerMember = command.filter(member => {
              return member.chatId !== member.ref
            })

            const memberId = beerMember.map(member => member.chatId)

            //если подпивасы не набраны
            if (beerMember.length < commandMemberCount || memberId.includes(+chatId)) {
              const newReg = await UserController
                .CreateOrUpdate(user, disciplineId, +chatId, tname, username, ref, commandName, regType, ip, city, region, country, phone, name, false, steamName)

              //новая регистрация
              if (newReg) {
                try {
                  await bot.sendMessage(chatId, texts.loteryRegDone(name))
                  await bot.sendMessage(chatId, texts.loteryRefUrl(chatId, callDataInGame))
                } catch (e) {
                }


                //если последний подпивас вкоманду
                if (beerMember.length + 1 === commandMemberCount) {
                  await UserRegService.editLOtteryRegDone(+ref, disciplineId);
                  await bot.sendMessage(ref, texts.loteryAccept)
                  await saveMessages(`${ref} полностью собрал всех подпивасов`,
                    chatId, "bot")

                }

                //изменение данных
              } else {
                await bot.sendMessage(chatId, `Спасибо за изменение данных, ${name}`)
              }

              //если подпивасы уже набраны
            } else {

              await bot.sendMessage(chatId, texts.lotteryTeamFull)
              await saveMessages(texts.lotteryTeamFull, chatId, "bot")
            }

          }

        } else {
          await bot.sendMessage(chatId, texts.regionNotAlloved)
          await saveMessages("не подходящий регион " + region, chatId, "bot")
        }
      }

      return await res.json({done: "done"})

    } catch (e) {
      console.log(e)
      await bot.sendMessage(ADMIN_ID, chatId + JSON.stringify(e))
      res.status(400).json(e)
      return await saveMessages(JSON.stringify({e, chatId}), chatId, "bot")
    }
  })


export default newRouter;
