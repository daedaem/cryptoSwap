import Card from "../../UI/Card/Card";
import React from "react";
import Header from "../../Common/Header/Header";
import classes from "./Home.module.css";
const Home = () => {
  return (
    <div className={classes.home}>
      <Card className={classes.section}>
        <section>
          <Header>스왑</Header>
          <article>하이</article>
          <input></input>
        </section>
      </Card>
    </div>
  );
};
export default Home;
