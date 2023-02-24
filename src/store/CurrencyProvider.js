import { useEffect, useReducer } from "react";
import CurrencyContext from "./currency-context";

export const TOKEN_LIST = {
  ETH: { id: "ethereum" },
  USDT: { id: "tether" },
  USDC: { id: "usd-coin" },
  DAI: { id: "dai" },
  AAVE: { id: "aave" },
  WBTC: { id: "bitcoin" },
  AXS: { id: "axie-infinity" },
  COMP: { id: "compound-coin" },
  CRV: { id: "curve-dao-token" },
  ENS: { id: "ethereum-name-service" },
};

export const findTokenId = (name) => {
  // console.log(TOKEN_LIST, name);
  return TOKEN_LIST[name].id;
};
// const fetchData = (selectedInputCoin) => {
//   let result;
//   async () => {
//     await AXIOS.get("price", {
//       params: {
//         ids: selectedInputCoin,
//         vs_currencies: "usd",
//       },
//     }).then((el) => {
//       this.result = el;
//     });
//   };
//   return result;
// };

const defaultCurrencyState = {
  searchedCoins: [],
  inputPrice: "",
  outputPrice: "",
  selectedInputCoinVal: 0,
  selectedOutputCoinVal: 0,
  selectedInputCoin: "dai",
  selectedOutputCoin: "usd-coin",
  resultInputPrice: 0,
  resultOutputPrice: 0,
};
const currencyReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "INIT_INPUT_COIN":
      newState = { ...state };
      newState.selectedInputCoinVal = action.val;
      return newState;
    case "INIT_OUTPUT_COIN":
      newState = { ...state };
      newState.selectedOutputCoinVal = action.val;
      return newState;
    case "INPUT_AMOUNT":
      newState = { ...state };
      if (
        action.val !== 0 &&
        action.val - Math.round(action.val) < Number.EPSILON
      ) {
        action.val = Number(action.val);
      }
      // console.log("인풋", state, action);
      // newState.selectedInputCoin = action.val.selectedInputCoin;
      newState.inputPrice = action.val;
      newState.resultInputPrice = newState.selectedInputCoinVal * action.val;
      return newState;
    case "OUTPUT_AMOUNT":
      newState = { ...state };
      if (
        action.val !== 0 &&
        action.val - Math.round(action.val) < Number.EPSILON
      ) {
        action.val = Number(action.val);
      }
      // newState.selectedOutputCoin = action.val.selectedOutputCoin;
      newState.outputPrice = action.val;
      newState.resultOutputPrice = newState.selectedOutputCoinVal * action.val;
      return newState;
    // case "RESULT_INPUT":
    //   newState = { ...state };
    //   if (newState.resultInputPrice != null) {
    //     newState.resultInputPrice =
    //       newState.inputPrice * action.val.resultInputPrice;
    //   }
    //   return newState;
    // case "RESULT_OUTPUT":
    //   newState = { ...state };
    //   if (newState.resultOutputPrice != null) {
    //     newState.resultOutputPrice =
    //       newState.outputPrice * action.val.resultOutputPrice;
    //   }
    //   return newState;
    default:
      return state;
  }
};

const CurrencyProvider = (props) => {
  console.log("몇번");
  const [currencyState, dispatchCurrencyAction] = useReducer(
    currencyReducer,
    defaultCurrencyState
  );

  const inputCoinValHandler = (id) => {
    dispatchCurrencyAction({ type: "INIT_INPUT_COIN", val: id });
  };
  const outputCoinValHandler = (id) => {
    dispatchCurrencyAction({ type: "INIT_OUTPUT_COIN", val: id });
  };
  const inputCoinAmountHandler = (amount) => {
    dispatchCurrencyAction({ type: "INPUT_AMOUNT", val: amount });
  };
  const outputCoinAmountHandler = (amount) => {
    dispatchCurrencyAction({ type: "OUTPUT_AMOUNT", val: amount });
  };
  // const resultInputPriceHandler = (result) => {
  //   dispatchCurrencyAction({ type: "RESULT_INPUT", val: result });
  // };
  // const resultOutputPriceHandler = (result) => {
  //   dispatchCurrencyAction({ type: "RESULT_OUTPUT", val: result });
  // };
  const currencyContext = {
    ...currencyState,
    inputCoinValHandler: inputCoinValHandler,
    outputCoinValHandler: outputCoinValHandler,
    inputCoinAmountHandler: inputCoinAmountHandler,
    outputCoinAmountHandler: outputCoinAmountHandler,
    // resultInputPriceHandler: resultInputPriceHandler,
    // resultOutputPriceHandler: resultOutputPriceHandler,
  };
  return (
    <CurrencyContext.Provider value={currencyContext}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyProvider;
