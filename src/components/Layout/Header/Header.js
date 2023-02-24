import HeaderIcons from "./HeaderIcons";
import classes from "./Header.module.css";
const Header = (props) => {
  return (
    <header className={`${props.className} ${classes.header}`}>
      <h3>스왑</h3>
      <HeaderIcons onClick={() => alert("준비 중입니다.")} />
    </header>
  );
};
export default Header;
