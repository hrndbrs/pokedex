"use client";
import React, { useState } from "react";
import styles from "./styles/SearchBar.module.css";

const Searchbar = ({ handleFilter }) => {
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = () => {
    setShowInput(true);
  };
  const clearSelection = (e) => {
    e.preventDefault();
    setSearchTerm("");
  };
  const handleBlur = () => {
    setShowInput(false);
    setSearchTerm("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFilter(searchTerm);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchBar} onClick={handleClick} onBlur={handleBlur}>
      <form>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={`${styles.inputField} ${showInput && styles.showInput}`}
            placeholder="Choose your Pokemon"
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className={searchTerm.length === 0 ? styles.inactive : styles.clear}
            onMouseDown={clearSelection}
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
        </div>

        <div className={`${styles.search} ${showInput && styles.showInput}`}>
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={5}
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
          >
            <path d="M19 11 A8 8 0 0 1 11 19 A8 8 0 0 1 3 11 A8 8 0 0 1 19 11 z" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
