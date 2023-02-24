import { useState, useEffect, useContext } from "react";
import CurrencyContext from "../../../store/currency-context";
import classes from "./SwapCurrencyInput.module.css";
import { AXIOS, FetchData } from "../../api/axios";
import { findTokenId } from "../../../store/CurrencyProvider";
import TokenInputSelectModal from "../TokenSelectModal/TokenInputSelectModal";

const SwapCurrencyInput = (props) => {
  const [selectedCoin, setSelectedCoin] = useState("DAI");
  const [amount, setAmount] = useState("");
  const [isModal, setIsModal] = useState(false);

  const ctx = useContext(CurrencyContext);
  useEffect(() => {
    FetchData(selectedCoin).then((el) => {
      ctx.inputCoinValHandler(
        selectedCoin,
        el.data[findTokenId(selectedCoin)].usd
      );
    });
  }, [selectedCoin]);

  useEffect(() => {
    if (ctx.resultInputPrice && ctx.selectedOutputCoinVal) {
      let val = ctx.resultInputPrice / ctx.selectedOutputCoinVal;
      if (!/^[\d]*\.?[\d]{0,10}$/.test(val)) {
        val = val.toFixed(10);
      }
      ctx.outputCoinAmountHandler(val);
    } else {
      ctx.outputCoinAmountHandler("");
    }
  }, [amount]);
  const selectedCoinHandler = (tokenName) => {
    ctx.searchKeywordChangeHandler(tokenName);
    setSelectedCoin(tokenName);
  };

  const InputChangeHandler = (e) => {
    const inputs = e.target.value.trim();
    if (/^[\d]*\.?[\d]{0,10}$/.test(inputs)) {
      ctx.inputCoinAmountHandler(inputs);
      setAmount(inputs);
    }
  };
  const modalCloseHandler = () => {
    setIsModal(false);
  };
  const modalOpenHandler = () => {
    setIsModal(true);
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
        <button className={classes.modalButton} onClick={modalOpenHandler}>
          {ctx.selectedInputCoin}
        </button>
        {isModal && (
          <TokenInputSelectModal
            onClose={modalCloseHandler}
            onSubmitInput={selectedCoinHandler}
          />
        )}
      </div>
      <div className={classes.resultInputPrice}>
        {ctx.inputPrice !== 0 && ctx.resultInputPrice && (
          <p>${Math.round(ctx.resultInputPrice * 100) / 100}</p>
        )}
      </div>
    </article>
  );
};
export default SwapCurrencyInput;
