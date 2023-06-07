"use client";
import React, { useState } from "react";
import styles from "./styles/searchbar.module.css";

const Searchbar = ({ handleFilter }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {
    setShowInput(true);
  };
  const clearSelection = () => {
    setSearchTerm("");
  };
  const handleBlur = () => {
    setShowInput(false);
    setSearchTerm("");
  };

  return (
    <div className={styles.searchBar} onClick={handleClick} onBlur={handleBlur}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFilter(searchTerm);
        }}
      >
        {showInput && (
          <input
            className={styles.inputField}
            placeholder="Choose your Pokemon"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        )}

        <button className={styles.search} type="submit" disabled={!showInput}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            viewBox="0 0 24 24"
            height="36px"
            width="36px"
          >
            <path d="M19 11 A8 8 0 0 1 11 19 A8 8 0 0 1 3 11 A8 8 0 0 1 19 11 z" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
        <button
          className={searchTerm.length === 0 ? styles.inactive : styles.clear}
          onClick={clearSelection}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
