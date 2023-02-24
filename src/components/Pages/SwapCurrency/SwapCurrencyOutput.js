import { useState, useEffect, useContext } from "react";
import CurrencyContext from "../../../store/currency-context";
import classes from "./SwapCurrencyOutput.module.css";
import { AXIOS, FetchData } from "../../api/axios";
import { findTokenId } from "../../../store/CurrencyProvider";
import TokenOutputSelectModal from "../TokenSelectModal/TokenInputSelectModal";

const SwapCurrencyOutput = (props) => {
  const [selectedCoin, setSelectedCoin] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [isModal, setIsModal] = useState(false);

  const ctx = useContext(CurrencyContext);
  useEffect(() => {
    FetchData(selectedCoin).then((el) => {
      ctx.outputCoinValHandler(
        selectedCoin,
        el.data[findTokenId(selectedCoin)].usd
      );
    });
  }, [selectedCoin]);

  useEffect(() => {
    if (ctx.resultOutputPrice && ctx.selectedInputCoinVal) {
      let val = ctx.resultOutputPrice / ctx.selectedInputCoinVal;
      if (!/^[\d]*\.?[\d]{0,10}$/.test(val)) {
        val = val.toFixed(10);
      }

      ctx.inputCoinAmountHandler(val);
    } else {
      ctx.inputCoinAmountHandler("");
    }
  }, [amount]);

  const selectedCoinHandler = (e) => {
    setSelectedCoin(e);
  };
  const InputChangeHandler = (e) => {
    const inputs = e.target.value.trim();
    if (/^[\d]*\.?[\d]{0,10}$/.test(inputs)) {
      ctx.outputCoinAmountHandler(inputs); //TODO : 확인
      setAmount(inputs); //TODO : 확인
    }
  };
  const modalCloseHandler = () => {
    setIsModal(false);
  };
  const modalOpenHandler = () => {
    setIsModal(true);
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
        <button className={classes.modalbutton} onClick={modalOpenHandler}>
          {ctx.selectedOutputCoin}
        </button>
        {isModal && (
          <TokenOutputSelectModal
            onClose={modalCloseHandler}
            onSubmitInput={selectedCoinHandler}
          />
        )}
      </div>
      <div className={classes.resultOutputPrice}>
        {ctx.outputPrice !== 0 && ctx.resultOutputPrice && (
          <p>${Math.round(ctx.resultOutputPrice * 100) / 100}</p>
        )}
      </div>
    </article>
  );
};
export default SwapCurrencyOutput;
