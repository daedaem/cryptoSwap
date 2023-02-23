import { useReducer } from "react";
import CurrencyContext from "./currency-context";

const defaultCurrencyState = {
  searchedCoins: [],
  inputPrice: 0,
  outputPrice: 0,
  selectedInputCoin: "",
  selectedOutputCoin: "",
  resultInputPrice: 0,
  resultOutputPrice: 0,
};
const currencyReducer = (state, action) => {
  if (action.type === "INPUT_AMOUNT") {
    console.log(state, "\n", action);
    if (action.val.inputPrice) {
      return {
        ...state,
        inputPrice: action.val.inputPrice,
      };
      //   searchedCoins: [],
      //   inputPrice: 0,
      //   outputPrice: 0,

      // selectedOutputCoin: "",
      // resultInputPrice: 0,
      // resultOutputPrice: 0,
    }
  }
  return defaultCurrencyState;
};

const CurrencyProvider = (props) => {
  const [currencyState, dispatchCurrencyAction] = useReducer(
    currencyReducer,
    defaultCurrencyState
  );
  const inputCoinAmountHandler = (amount) => {
    dispatchCurrencyAction({ type: "INPUT_AMOUNT", val: amount });
  };

  const currencyContext = {
    ...currencyState,
    inputCoinAmountHandler: inputCoinAmountHandler,
  };
  return (
    <CurrencyContext.Provider value={currencyContext}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
export default CurrencyProvider;
