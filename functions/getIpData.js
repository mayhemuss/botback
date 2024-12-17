import geoip from "geoip-lite";
import {DADATA_TOKEN} from "../tokens/token.js";

export async function getIpData(ip, retries = 5, delay = 1000) {
  const ipData = []
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`)

      // Если запрос успешен, возвращаем результат
      if (response.status === 200) {

        const dat = await response.json()
        const {city, region, country} = dat
        ipData.push({city, region, country, from: "2domains.ru"})
        break
      } else {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Попытка ${i + 1} не удалась. Повтор через ${delay} мс.`);
        await new Promise(res => setTimeout(res, delay)); // Ждем перед повторной попыткой
      } else {
        console.log("не удалось 2domains.ru")
      }
    }
  }

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}`,
        {
          method: "GET",
          // mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + DADATA_TOKEN
          }
        })

      const dat = await response.json()

      // Если запрос успешен, возвращаем результат
      if (response.status === 200) {


        const {location: {data}} = await dat

        const city = await data?.city
        const region = await data?.region
        const country = await data?.country
        // const { region, country} = await data
        console.log(dat)
        ipData.push({city, region, country, from: "dadata.ru"})
        break
      } else {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
    } catch (error) {
      console.log(error)

      if (i < retries - 1) {
        console.log(`Попытка ${i + 1} не удалась. Повтор через ${delay} мс.`);
        await new Promise(res => setTimeout(res, delay)); // Ждем перед повторной попыткой
      } else {
        console.log("не удалось dadata.ru")
      }
    }
  }

  const fromBib = geoip.lookup(ip)
  const {city, region, country} = fromBib
  ipData.push({city, region, country, from: "from bib"})

  return ipData
}
