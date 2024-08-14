


export const timeCheck = (list) => {
  return list.filter(event => {
    const now = Date.now()
    return event.dateEnd > now && event.dateStart < now
  }).map(event => {
    return {
      ...event,
      callData: event.anonced +"_"+ event.dateEnd
    }
  })
}






