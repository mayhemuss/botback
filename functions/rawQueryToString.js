export const rawQueryToString = (rawQuery)=>{
  const query = Object.entries(rawQuery)
    .map(param => {
      return param.join("=")
    }).join("&")
  return query
}
