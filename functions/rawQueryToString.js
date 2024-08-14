export const rawQueryToString = (rawQuery)=>{
  const lenght = Object.keys(rawQuery).length ? "?" : ""
  const query = Object.entries(rawQuery)
    .map(param => {
      return param.join("=")
    }).join("&")
  return {lenght, query}
}
