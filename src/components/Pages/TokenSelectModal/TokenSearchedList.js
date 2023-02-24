import classes from "./TokenSearchedList.module.css";

const TokenSearchedList = (props) => {
  return (
    <div className={classes.listFrame} onClick={props.onClick}>
      <p>{props.List}</p>
    </div>
  );
};
export default TokenSearchedList;
