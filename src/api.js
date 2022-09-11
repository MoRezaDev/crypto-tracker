import axios from "axios";

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d";

const getCoins = async () => {
  const result = await axios.get(URL).catch((err) => console.log(err));
  return result.data;
};

export { getCoins };
