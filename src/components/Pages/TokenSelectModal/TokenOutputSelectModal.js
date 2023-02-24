import { useState, useEffect } from "react";
import { TOKEN_LIST } from "../../../store/CurrencyProvider";
import Modal from "../../Common/Modal/Modal";
import TokenSearchedList from "./TokenSearchedList";
import classes from "./TokenOutputSelectModal.module.css";
import TokenSelectModalIcon from "./TokenSelectModalIcon";

const TokenOutputSelectModal = (props) => {
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [searchedCoinList, setSearchedCoinList] = useState([]);
  const changeInputHandler = (e) => {
    const word = e.target.value.trim().toUpperCase();
    if (word.length > 0) {
      setSearchKeyword(word);
    }
  };
  const findTokenList = () => {
    if (searchKeyword) {
      const words = searchKeyword;
      const results = Object.keys(TOKEN_LIST).filter((el) => {
        // console.log(el);
        if (el[0] === words[0] && el.includes(words)) {
          return true;
        }
      });
      setSearchedCoinList([...results]);
    }
  };
  const selectedKeyword = (e) => {
    props.onSubmitOutput(e.target.textContent);
    props.onClose();
  };
  useEffect(() => {
    findTokenList();
  }, [searchKeyword]);
  return (
    <Modal className={classes.modal} onClose={props.onClose}>
      <header className={classes.header}>
        <p>토큰선택</p>
        <button className={classes.modalExitButton} onClick={props.onClose}>
          x
        </button>
      </header>
      <form className={classes.modalInputForm}>
        <input
          type="text"
          className={classes.modalInput}
          onChange={changeInputHandler}
        ></input>
      </form>
      <div>기록들</div>
      <div>
        {searchedCoinList.length > 0 ? (
          <ul className={classes.searchedList}>
            {searchedCoinList.map((el) => {
              return (
                <TokenSearchedList
                  onClick={selectedKeyword}
                  List={el}
                  key={el}
                />
              );
            })}
          </ul>
        ) : (
          <p>토큰 아이디를 입력해주세요</p>
        )}
      </div>
      <footer className={classes.footer}>
        <TokenSelectModalIcon />
        <h1>토큰목록관리</h1>
      </footer>
    </Modal>
  );
};
export default TokenOutputSelectModal;
