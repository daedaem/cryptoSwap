import React from "react";

import classes from "./Card.module.css";
const Card = (props) => {
  //   console.log(props);
  return (
    <div className={`${props.className} ${classes.card} `}>
      {props.children}
    </div>
  );
};
export default Card;
