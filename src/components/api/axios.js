import axios from "axios";
import { findTokenId } from "../../store/CurrencyProvider";
const BASE_URL = "https://api.coingecko.com/api/v3/simple/";

const axiosAPI = (url, options) => {
  const instance = axios.create({
    baseURL: url,
    headers: { "X-Custom-Header": "foobar" },
    timeout: 5000,
  });
  return instance;
};

export const AXIOS = axiosAPI(BASE_URL);

export const FetchData = async (coinName, vs_currencies) => {
  const tokenId = findTokenId(coinName);
  let result = null;
  await AXIOS.get("price", {
    params: {
      ids: tokenId,
      vs_currencies: vs_currencies !== undefined ? vs_currencies : "usd",
    },
  }).then((data) => {
    result = data;
  });
  return result;
};
