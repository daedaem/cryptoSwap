import { useState, useContext } from "react";
import CurrencyContext from "../../../store/currency-context";
import classes from "./SwapCurrencyInput.module.css";
const SwapCurrencyInput = () => {
  const [amount, setAmount] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("DAI");
  const ctx = useContext(CurrencyContext);
  const { inputPrice, selectedInputCoin, resultInputPrice } = ctx;
  const submitInputHandler = (val) => {
    ctx.inputCoinAmountHandler({
      ...ctx,
      selectedInputCoin: selectedCoin,
      inputPrice: val,
    });
    // axios.
  };
  let timer = null;
  const selectedCoinHandler = (e) => {
    setSelectedCoin("DAI");
  };
  const InputChangeHandler = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      //아래숫자인지 확인해봐야할듯
      if (e.target.value.trim().length > 0 && e.target.value > 0) {
        // 0보다 크거나 0.1 부동소수점때문에 고민
        setAmount(e.target.value);
        submitInputHandler(e.target.value); //TODO : 확인
      } else {
        setAmount(0);
        submitInputHandler(0); //TODO : 확인
      }
    }, 500);
  };
  return (
    <article className={classes.SwapCurrencyInputFrame}>
      <div className={classes.SwapCurrencyInput}>
        <form>
          <input
            className={classes["token-amount-input"]}
            // defaultValue="0"
            type="number"
            placeholder="0"
            onChange={InputChangeHandler}
          />
        </form>
        <button onSubmit={selectedCoinHandler}>하이</button>
      </div>
      <div className={classes.resultInputPrice}>
        {inputPrice != 0 && <p>{inputPrice}</p>}
      </div>
    </article>
  );
};
export default SwapCurrencyInput;
