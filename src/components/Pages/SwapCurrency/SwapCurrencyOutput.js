import { useState, useContext } from "react";
import CurrencyContext from "../../../store/currency-context";
import classes from "./SwapCurrencyOutput.module.css";
const SwapCurrencyOutput = () => {
  const [amount, setAmount] = useState(0);
  const ctx = useContext(CurrencyContext);
  const { inputPrice, selectedInputCoin, resultOutputPrice } = ctx;
  const submitInputHandler = () => {
    // axios.
  };
  let timer = null;
  const InputChangeHandler = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // console.log(e.target.value);
      //아래숫자인지 확인해봐야할듯
      if (e.target.value.trim().length > 0) {
        setAmount(e.target.value);
      } else {
        setAmount(0);
      }
      submitInputHandler; //TODO : 확인
    }, 500);
  };
  return (
    <article className={classes.SwapCurrencyOutputFrame}>
      <div className={classes.SwapCurrencyOutput}>
        <form onChange={submitInputHandler}>
          <input
            className={classes["token-amount-output"]}
            // defaultValue="0"
            type="number"
            placeholder="0"
            onChange={InputChangeHandler}
          />
        </form>
        <button>하이</button>
      </div>
      <div className={classes.resultOutputPrice}>
        {resultOutputPrice && <p>{resultOutputPrice}</p>}
      </div>
    </article>
  );
};
export default SwapCurrencyOutput;
