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
  // ethereum: { name: "ETH" },
  // tether: { name: "USDT" },
  // "usd-coin": { name: "USDC" },
  // dai: { name: "DAI" },
  // aave: { name: "AAVE" },
  // bitcoin: { name: "WBTC" },
  // "axie-infinity": { name: "AXS" },
  // "compound-coin": { name: "COMP" },
  // "curve-dao-token": { name: "CRV" },
  // "ethereum-name-service": { name: "ENS" },
};

export const findTokenId = (name) => {
  return TOKEN_LIST[name].id;
};

const defaultCurrencyState = {
  searchedCoins: [],
  inputPrice: "",
  outputPrice: "",
  selectedInputCoinVal: 0,
  selectedOutputCoinVal: 0,
  selectedInputCoin: "DAI",
  selectedOutputCoin: "USDC",
  resultInputPrice: 0,
  resultOutputPrice: 0,
};
const currencyReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "INIT_INPUT_COIN":
      newState = { ...state };
      newState.selectedInputCoin = action.val.id;
      newState.selectedInputCoinVal = action.val.val;
      return newState;
    case "INIT_OUTPUT_COIN":
      newState = { ...state };
      newState.selectedOutputCoin = action.val.id;
      newState.selectedOutputCoinVal = action.val.val;
      return newState;
    case "INPUT_AMOUNT":
      newState = { ...state };
      if (
        action.val !== 0 &&
        action.val - Math.round(action.val) < Number.EPSILON
      ) {
        action.val = Number(action.val);
      }
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
      newState.outputPrice = action.val;
      newState.resultOutputPrice = newState.selectedOutputCoinVal * action.val;
      return newState;

    default:
      return state;
  }
};

const CurrencyProvider = (props) => {
  const [currencyState, dispatchCurrencyAction] = useReducer(
    currencyReducer,
    defaultCurrencyState
  );

  const inputCoinValHandler = (id, value) => {
    dispatchCurrencyAction({
      type: "INIT_INPUT_COIN",
      val: { id: id, val: value },
    });
  };
  const outputCoinValHandler = (id, value) => {
    dispatchCurrencyAction({
      type: "INIT_OUTPUT_COIN",
      val: { id: id, val: value },
    });
  };
  const inputCoinAmountHandler = (amount) => {
    dispatchCurrencyAction({ type: "INPUT_AMOUNT", val: amount });
  };
  const outputCoinAmountHandler = (amount) => {
    dispatchCurrencyAction({ type: "OUTPUT_AMOUNT", val: amount });
  };

  const currencyContext = {
    ...currencyState,
    inputCoinValHandler: inputCoinValHandler,
    outputCoinValHandler: outputCoinValHandler,
    inputCoinAmountHandler: inputCoinAmountHandler,
    outputCoinAmountHandler: outputCoinAmountHandler,
  };
  return (
    <CurrencyContext.Provider value={currencyContext}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyProvider;
