import { useState } from "react";
import classes from "./SwapCurrencyOutput.module.css";
const SwapCurrencyOutput = () => {
  const [amount, setAmount] = useState(0);
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  // };
  let timer = null;
  const inputChangeHandler = (e) => {
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
    <article className={classes.SwapCurrencyOutput}>
      <form>
        <input
          className={classes["token-amount-output"]}
          // defaultValue="0"
          type="number"
          placeholder="0"
          onChange={inputChangeHandler}
        />
      </form>
      <button>하이</button>
    </article>
  );
};
export default SwapCurrencyOutput;
