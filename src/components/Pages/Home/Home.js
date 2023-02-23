import Card from "../../Common/Card/Card";
import { useContext } from "react";
import Header from "../../Layout/Header/Header";
import classes from "./Home.module.css";
import SwapCurrency from "../SwapCurrency/SwapCurrency";
import CurrencyContext from "../../../store/currency-context";
const Home = () => {
  let coinList;
  const ctx = useContext(CurrencyContext);
  const sendButton =
    ctx.inputPrice || ctx.outputPrice ? (
      <button className={classes.button}>스 왑</button>
    ) : (
      <button className={`${classes["button-disabled"]}`} disabled>
        금액을 입력해주세요
      </button>
    );
  return (
    <div className={classes.home}>
      <Card className={classes.section}>
        <section>
          <Header>스왑</Header>
          <SwapCurrency></SwapCurrency>
          <footer className={classes.footer}>{sendButton}</footer>
        </section>
      </Card>
    </div>
  );
};
export default Home;
