import { useState, useEffect, useContext } from "react";
import CurrencyContext from "../../../store/currency-context";
import classes from "./SwapCurrencyOutput.module.css";
import { AXIOS, FetchData } from "../../api/axios";
import { findTokenId } from "../../../store/CurrencyProvider";

const SwapCurrencyOutput = () => {
  const [selectedCoin, setSelectedCoin] = useState("usd-coin");
  const [amount, setAmount] = useState("");
  const ctx = useContext(CurrencyContext);
  useEffect(() => {
    FetchData(selectedCoin).then((el) => {
      ctx.outputCoinValHandler(el.data[selectedCoin].usd);
    });
  }, [selectedCoin]);

  useEffect(() => {
    if (ctx.resultOutputPrice && ctx.selectedInputCoinVal) {
      let val = ctx.resultOutputPrice / ctx.selectedInputCoinVal;
      const result = /^[\d]*\.?[\d]{0,10}$/.test(val);
      if (!result) {
        val = val.toFixed(10);
      }

      ctx.inputCoinAmountHandler(val);
    } else {
      ctx.inputCoinAmountHandler("");
    }
  }, [amount]);

  const selectedCoinHandler = (e) => {
    setSelectedCoin("usd-coin");
  };
  const InputChangeHandler = (e) => {
    const inputs = e.target.value.trim();
    const result = /^[\d]*\.?[\d]{0,10}$/.test(inputs);
    if (result) {
      ctx.outputCoinAmountHandler(inputs); //TODO : 확인
      setAmount(inputs); //TODO : 확인
    }
  };
  return (
    <article className={classes.SwapCurrencyOutputFrame}>
      <div className={classes.SwapCurrencyOutput}>
        <form>
          <input
            className={classes["token-amount-output"]}
            placeholder="0"
            type="number"
            value={ctx.outputPrice == 0 ? "" : ctx.outputPrice}
            onChange={InputChangeHandler}
          />
        </form>
        <button onSubmit={selectedCoinHandler}>하이</button>
      </div>
      <div className={classes.resultOutputPrice}>
        {ctx.outputPrice !== 0 && ctx.resultOutputPrice && (
          <p>{Math.floor(ctx.resultOutputPrice * 100) / 100}</p>
        )}
      </div>
    </article>
  );
};
export default SwapCurrencyOutput;
