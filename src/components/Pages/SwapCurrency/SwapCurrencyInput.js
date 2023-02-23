import { useState } from "react";
import classes from "./SwapCurrencyInput.module.css";
const SwapCurrencyInput = () => {
  const [amount, setAmount] = useState(0);
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };
  let timer = null;
  const InputChangeHandler = (e) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log(e.target.value);
      //아래숫자인지 확인해봐야할듯
      if (e.target.value.trim().length > 0) {
        setAmount(e.target.value);
      } else {
        setAmount(0);
      }
    }, 500);
  };
  return (
    <article className={classes.SwapCurrencyInput}>
      <form>
        <input
          className={classes["token-amount-input"]}
          // defaultValue="0"
          type="number"
          placeholder="0"
          onChange={InputChangeHandler}
        />
      </form>
      <button>하이</button>
    </article>
  );
};
export default SwapCurrencyInput;
