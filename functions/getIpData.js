import geoip from "geoip-lite";

export async function getIpData(ip, retries = 5, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`https://2domains.ru/api/web-tools/geoip?ip=${ip}`)

      // Если запрос успешен, возвращаем результат
      if (response.status === 200) {

        return await response.json()

      } else {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
    } catch (error) {
      if (i < retries - 1) {
        console.log(`Попытка ${i + 1} не удалась. Повтор через ${delay} мс.`);
        await new Promise(res => setTimeout(res, delay)); // Ждем перед повторной попыткой
      } else {
        console.log("запрос через библиотеку")
        const ipData = geoip.lookup(ip)
        const {city, region, country} = ipData
        return {city, region, country}
      }
    }
  }
}
