"use Client";
import React, { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar";
import axios from "axios";
import DisplayPokemon from "./components/DisplayPokemon";
import DisplayPokemonSub from "./components/DisplayPokemonSub";

const Main = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const entries = filteredData.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(filteredData.length / recordsPerPage);
  //   const pageIndex = [...Array(npage + 1).keys()].slice(1);

  const APIBase = "https://pokeapi.co/api/v2/";
  const fetchPokemon = () => {
    axios
      .get(APIBase + "pokemon?limit=1008")
      .then((res) => {
        const results = res.data.results;
        setData(results);
        setFilteredData(results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //   const fetchPokemon = async () => {
  //     try {
  //       const response = await axios.get(APIBase + "pokemon?limit=1008");
  //       const results = response.data.results;
  //       setData(results);
  //       setFilteredData(results);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  const handleClickPrev = () => {
    if (currentPage !== 1) setCurrentPage((state) => state - 1);
  };
  const handleClickNext = () => {
    if (currentPage !== numberOfPages) setCurrentPage((state) => state + 1);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handleFilter = (payload) => {
    setFilteredData(
      data.filter((pokemon) => {
        return pokemon.name.startsWith(payload.toLowerCase());
      })
    );
  };

  return (
    <div>
      <Searchbar handleFilter={handleFilter} />
      <ul>
        {entries.map((entry) => {
          // const index = Number(entry.url.slice(34, -1));

          // return <li key={index}>{index}. {entry.name}</li>;
          return (
            // <DisplayPokemon key={entry.url} name={entry.name} url={entry.url} />
            <DisplayPokemonSub key={entry.url} name={entry.name} url={entry.url} />
          );
        })}
      </ul>
      <div>
        <button onClick={handleClickPrev}>Prev</button>
        <button onClick={handleClickNext}>Next</button>
      </div>
    </div>
  );
};

export default Main;
