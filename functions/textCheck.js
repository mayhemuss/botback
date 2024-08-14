
export const textCheck = (text, tests) => {
  const searchText = text.toLowerCase()
    .replaceAll("?", "")
    .replaceAll(".", "")
    .replaceAll(",", "")
    .replaceAll("-", "")
    .split(" ")
  for (let i = 0; i < tests.length; i++) {
    for (let j = 0; j < searchText.length; j++)
      if (searchText[j].includes(tests[i])) {
        return true
      }
  }
  return false
}





