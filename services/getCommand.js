import {getDataFromExel} from "./exelData.js";


export const getCommand = async (exelSheet, chatId) => {

  const exelData = await getDataFromExel(exelSheet)

  if (exelData.length === 0) {
    return {type: "noReg"}
  }

  // console.log(exelData)
  const member = exelData.filter(member => {
    return +member.chatId === +chatId
  })


  if (member.length === 0) {
    return {type: "noReg"}
  }

  if (+member[0].ref === +chatId) {

    const currentTeam = exelData.filter(oneMember => {
      return +oneMember.ref === +chatId
    })



    return {
      type: "capitan",
      count: currentTeam.length,
      commandName: currentTeam[0].commandName,
      members: currentTeam.map(oneMember => {
        const {name, username, chatId, telegramName, registrationType} = oneMember
        return {name, username, chatId, telegramName, registrationType}
      })
    }


  } else {

    const currentTeam = exelData.filter(oneMember => {
      return oneMember.ref === member[0].ref
    })


    const capitan = currentTeam.filter(member => {
      return +member.ref === +member.chatId
    }).map(oneMember => {
      const {name, username, chatId, telegramName, registrationType} = oneMember
      return {name, username, chatId, telegramName, registrationType}
    })[0]


    console.log(capitan)
    return {
      type: "user",
      capitan
    }
  }

}
