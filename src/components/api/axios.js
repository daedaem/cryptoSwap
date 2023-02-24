import axios from "axios";

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
  // const tokenId = findTokenId(coinName);
  let result = null;
  await AXIOS.get("price", {
    params: {
      ids: coinName,
      vs_currencies: vs_currencies !== undefined ? vs_currencies : "usd",
    },
  }).then((data) => {
    console.log("axios", data);
    result = data;
  });
  return result;
};

// export const getD = async (nowData) => {
//   const URL =
//     "https://main-chatbot-api-ainize-team.endpoint.ainize.ai/v1/bot/chat";
//   await axios
//     .post(URL, { message: nowData.message })
//     .then((data) => {
//       setTextData((prevdata) => {
//         return [...prevdata, { message: data.data, to: "human" }];
//       });
//     })
//     .catch((error) => console.log(error));
// };
