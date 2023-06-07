import React from "react";
import styles from "./styles/navigationButton.module.css";
import { Context } from "../index";

const NavigationButton = ({onClickNext, onClickPrev}) => {
  const { currentPage, numberOfPages } = React.useContext(Context);
  const arrowSize = '72'
  return (
    <div className={styles.navButton}>
      <button
        className={
          currentPage === 1 || numberOfPages === 0
            ? styles.inactive
            : styles.prev
        }
        onClick={onClickPrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={arrowSize}
          viewBox="0 -960 960 960"
          width={arrowSize}
        >
          <path d="M400-80 0-480l400-400 56 57-343 343 343 343-56 57Z" />
        </svg>
      </button>
      <button
        className={
          currentPage === numberOfPages || numberOfPages === 0
            ? styles.inactive
            : styles.next
        }
        onClick={onClickNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={arrowSize}
          viewBox="0 -960 960 960"
          width={arrowSize}
        >
          <path d="m304-82-56-57 343-343-343-343 56-57 400 400L304-82Z" />
        </svg>
      </button>
    </div>
  );
};

export default NavigationButton;
