import { useState } from "react";
import classes from "./TokenSearchedList.module.css";

const TokenSearchedList = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div
      className={
        isHovering
          ? `${classes.listFrame} ${classes.hovering}`
          : `${classes.listFrame}`
      }
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={props.onClick}
    >
      <p>{props.List}</p>
    </div>
  );
};
export default TokenSearchedList;
