import CurrencyProvider from "../../../store/CurrencyProvider";
import SwapCurrencyInput from "./SwapCurrencyInput";
import SwapCurrencyOutput from "./SwapCurrencyOutput";

const SwapCurrency = (props) => {
  return (
    <CurrencyProvider>
      <SwapCurrencyInput></SwapCurrencyInput>
      <SwapCurrencyOutput></SwapCurrencyOutput>
    </CurrencyProvider>
  );
};
export default SwapCurrency;
