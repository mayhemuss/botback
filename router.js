// import Router from "express";
// import {saveMessages} from "./services/saveMessages.js";
// import {getRegType} from "./services/getRegType.js";
// import {gamesList} from "./games/gamesList.js";
// import {bot} from "./index.js";
// import {timeCheck} from "./functions/timeCheck.js";
// import {ADMIN_ID} from "./tokens/url.js";
// import {gameChangeData} from "./services/gameChangeData.js";
// import {gameNewRegGame} from "./services/gameNewRegGame.js";
// import {lotteryReg} from "./services/LotteryReg.js";
//
//
// const router = new Router();
//
// router.post("/type",
//   async (req, res) => {
//     try {
//
//       console.log("fet")
//       const {id} = req.body;
//       await saveMessages("открыл страницу регистрации", id)
//
//       return await res.json({types: "done"})
//     } catch (e) {
//       console.log(e)
//       return res.json(e);
//     }
//   })
//
// router.post("/regis",
//   async (req, res) => {
//
//     const {
//       date,
//       phone,
//       name,
//       subscribe,
//       chatId,
//       tname,
//       username,
//       regType,
//       ref,
//       callData,
//       commandName,
//       steamName,
//       ip
//     } = req.body;
//
//     try {
//       await saveMessages(JSON.stringify(req.body), chatId, "bot")
//       // await saveMessages(`отправил данные, телефон - ${phone}, имя - ${name}`, chatId)
//       const [anonced, dateEnd] = await callData.split("_")
//
//       //список игр
//       const games = timeCheck(gamesList).filter(game => {
//         return game.anonced === anonced && game.callData
//       })
//
//       //нет игр
//       if (games.length === 0) {
//         res.json({message: "done"})
//         return bot.sendMessage(chatId, "Регистрация на мероприятие уже была окончена")
//       }
//
//       //игра
//       const {
//         registrationSheets,
//         gameName,
//         callData: callDataInGame,
//         lotterySheets,
//         type,
//         commandMemberCount
//       } = games[0]
//
//       //регистрация на игры
//       if (type === "game") {
//
//         //командные игры
//         // if (commandMemberCount > 1) {
//           //проверка игры
//           const {
//             index,
//             commandName: comName,
//             userIds,
//             count,
//             exelData
//           } = await getRegType(chatId, registrationSheets, ref, "имя команды")
//           //замена данных
//           if (index !== -1) {
//             await gameChangeData(
//               index, registrationSheets, date, phone,
//               name, subscribe, tname, username, chatId, ip
//             )
//           } else {
//             //новая регистрация
//             await gameNewRegGame(
//               registrationSheets, date, phone, name, subscribe, tname, username,
//               chatId, ip, ref, commandName, regType, games, userIds, callDataInGame,
//               gameName, comName, count, exelData
//             )
//           }
//           //одиночная игра
//         // }else{
//         //   //проверка игры
//         //   const {
//         //     index,
//         //
//         //   } = await getRegType(chatId, registrationSheets,  )
//         //   //замена данных
//         //   if (index !== -1) {
//         //     await gameChangeData(
//         //       index, registrationSheets, date, phone,
//         //       name, subscribe, tname, username, chatId, ip
//         //     )
//         //   } else {
//         //     //новая регистрация
//         //     await gameNewRegGame(
//         //       registrationSheets, date, phone, name, subscribe, tname, username,
//         //       chatId, ip, ref, commandName, regType, games, userIds, callDataInGame,
//         //       gameName, comName, count
//         //     )
//         //   }
//         // }
//
//       }
//       //lottery
//       if (type === "lottery") {
//         await lotteryReg(ip, chatId, registrationSheets, ref,
//           username, date, phone, name, subscribe,
//           tname, steamName, commandMemberCount, callDataInGame, lotterySheets)
//       }
//       return await res.json({done: "done"})
//
//     } catch (e) {
//       await bot.sendMessage(ADMIN_ID, chatId + JSON.stringify(e))
//       res.status(400).json(e)
//       return await saveMessages(JSON.stringify({e, chatId}), chatId, "bot")
//     }
//   })
//
//
// export default router;
