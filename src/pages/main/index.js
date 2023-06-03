"use Client";
import React, { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar";
import axios from "axios";

const Main = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const APIBase = "https://pokeapi.co/api/v2/";
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(APIBase + "pokemon?limit=1008");
        const results = response.data.results;
        setData(results);
        setFilteredData(results);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemon();
  }, []);

  const handleFilter = (payload) => {
    setFilteredData(
      data.filter((pokemon) => {
        return pokemon.name.startsWith(payload);
      })
    );
  };

  return (
    <div>
      <Searchbar handleFilter={handleFilter} />
      <ul>
        {filteredData.map((datum) => (
          <li key={datum.url}>{datum.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
