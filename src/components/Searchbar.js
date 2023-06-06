"use client";
import React, { useState } from "react";

const Searchbar = ({ handleFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFilter(searchTerm);
        }}
      >
        <input
          placeholder="Search a Pokemon"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Searchbar;
