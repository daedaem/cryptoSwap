import { useContext } from "react";
import SwapCurrencyInput from "./SwapCurrencyInput";
import SwapCurrencyOutput from "./SwapCurrencyOutput";
import CurrencyContext from "../../../store/currency-context";
import SwapCurrencyIcon from "./SwapCurrencyIcon";
import classes from "./SwapCurrency.module.css";

const SwapCurrency = (props) => {
  const ctx = useContext(CurrencyContext);
  return (
    <>
      <SwapCurrencyInput></SwapCurrencyInput>
      <SwapCurrencyOutput></SwapCurrencyOutput>
      {(ctx.resultInputPrice !== 0 || ctx.resultOutputPrice !== 0) && (
        <div className={classes.swapCurrencyFrame}>
          <SwapCurrencyIcon />
          <p className={classes.swapCurrencyNotice}>{`1 ${
            ctx.selectedOutputCoin
          } = ${(ctx.selectedOutputCoinVal / ctx.selectedInputCoinVal).toFixed(
            10
          )} ${ctx.selectedInputCoin} ($${ctx.selectedInputCoinVal})`}</p>
        </div>
      )}
    </>
  );
};
export default SwapCurrency;
