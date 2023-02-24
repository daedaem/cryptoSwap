import { useState, useEffect } from "react";
import { TOKEN_LIST } from "../../../store/CurrencyProvider";
import Modal from "../../Common/Modal/Modal";
import TokenSearchedList from "./TokenSearchedList";
import classes from "./TokenOutputSelectModal.module.css";
import CurrencyContext from "../../../store/currency-context";

const TokenOutputSelectModal = (props) => {
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [searchedCoinList, setSearchedCoinList] = useState([]);
  const [searchHistory, setSearchHistory] = useState(
    localStorage.getItem("keywords")
      ? JSON.parse(localStorage.getItem("keywords"))
      : ctx.searchedCoins
  );
  const ctx = useContext(CurrencyContext);

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
        if (el[0] === words[0] && el.includes(words)) {
          return true;
        }
      });
      setSearchedCoinList([...results]);
    }
  };
  const selectedKeyword = (e) => {
    props.onSubmitOutput(e.target.textContent);
    ctx.searchKeywordChangeHandler(e.target.textContent);
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
          placeholder="이름 검색"
          type="text"
          className={classes.modalInput}
          onChange={changeInputHandler}
        ></input>
      </form>
      <div className={classes.searchKeywordButtons}>
        {searchHistory.map((el) => {
          return (
            <button
              key={el}
              onClick={selectedKeyword}
              className={classes.searchedButton}
            >
              {el}
            </button>
          );
        })}
      </div>
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
          <div className={classes["searchedList-empty-content"]}>
            <h3 className={classes["searchedList-empty-content-title"]}>
              토큰 아이디를 입력해주세요
            </h3>
          </div>
        )}
      </div>
      <footer
        className={classes.footer}
        onClick={() => alert("준비 중입니다.")}
      >
        <h3>토큰목록관리</h3>
      </footer>
    </Modal>
  );
};
export default TokenOutputSelectModal;
