import Card from "../../Common/Card/Card";
import React from "react";
import Header from "../../Layout/Header/Header";
import classes from "./Home.module.css";
import SwapCurrency from "../SwapCurrency/SwapCurrency";
const Home = () => {
  let coinList;
  return (
    <div className={classes.home}>
      <Card className={classes.section}>
        <section>
          <Header>스왑</Header>
          <SwapCurrency></SwapCurrency>
          <footer>
            <form action="">
              <input />
            </form>
          </footer>
        </section>
      </Card>
    </div>
  );
};
export default Home;
