import { useState, useEffect, useContext } from "react";
import CurrencyContext from "../../../store/currency-context";
import classes from "./SwapCurrencyInput.module.css";
import { AXIOS, FetchData } from "../../api/axios";
import { findTokenId } from "../../../store/CurrencyProvider";

const SwapCurrencyInput = (props) => {
  const [selectedCoin, setSelectedCoin] = useState("ethereum");
  const [amount, setAmount] = useState("");
  const ctx = useContext(CurrencyContext);
  useEffect(() => {
    FetchData(selectedCoin).then((el) => {
      ctx.inputCoinValHandler(el.data[selectedCoin].usd);
    });
  }, [selectedCoin]);

  useEffect(() => {
    if (ctx.resultInputPrice && ctx.selectedOutputCoinVal) {
      let val = ctx.resultInputPrice / ctx.selectedOutputCoinVal;
      const result = /^[\d]*\.?[\d]{0,10}$/.test(val);
      if (!result) {
        val = val.toFixed(10);
      }

      ctx.outputCoinAmountHandler(val);
    } else {
      ctx.outputCoinAmountHandler("");
    }
  }, [amount]);

  const selectedCoinHandler = (e) => {
    setSelectedCoin("dai");
  };

  const InputChangeHandler = (e) => {
    const inputs = e.target.value.trim();
    const result = /^[\d]*\.?[\d]{0,10}$/.test(inputs);
    if (result) {
      ctx.inputCoinAmountHandler(inputs); //TODO : 확인
      setAmount(inputs); //TODO : 확인
    }
  };
  return (
    <article className={classes.SwapCurrencyInputFrame}>
      <div className={classes.SwapCurrencyInput}>
        <form>
          <input
            className={classes["token-amount-input"]}
            placeholder="0"
            type="number"
            value={ctx.inputPrice == 0 ? "" : ctx.inputPrice}
            onChange={InputChangeHandler}
          />
        </form>
        <button onSubmit={selectedCoinHandler}>하이</button>
      </div>
      <div className={classes.resultInputPrice}>
        {ctx.inputPrice !== 0 && ctx.resultInputPrice && (
          <p>{Math.floor(ctx.resultInputPrice * 100) / 100}</p>
        )}
      </div>
    </article>
  );
};
export default SwapCurrencyInput;
