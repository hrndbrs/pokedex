"use Client";
import React, { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar";
import { useDispatch, useSelector } from "react-redux";
import { searchSelectors, showPokemon } from "./showPokemonSlice";

const Main = () => {
  const dispatch = useDispatch();
  const data = useSelector(searchSelectors.getPokemon);
  const loading = useSelector(searchSelectors.loading);

  const [filteredData, setFilteredData] = useState(data);

  dispatch(showPokemon());

  useEffect(() => {
    console.log(filteredData)
  }, [filteredData]);

  const handleFilter = (payload) => {
    setFilteredData(data.filter((pokemon) => pokemon.name.includes(payload)));
  };

  return (
    <div>
      <Searchbar handleFilter={handleFilter} />
      <div></div>
    </div>
  );
};

export default Main;
