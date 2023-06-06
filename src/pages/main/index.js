"use Client";
import React, { useEffect, useState, Component } from "react";
import Searchbar from "@/components/Searchbar";
import axios from "axios";
import PokemonDisplay from "./components/PokemonDisplay";
import styles from "./styles/main.module.css";

const APIBase = "https://pokeapi.co/api/v2/";

const Main = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const entries = filteredData.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(filteredData.length / recordsPerPage);

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
    <div className="container" s>
      <div className={styles.header}>
        <Searchbar handleFilter={handleFilter} />
      </div>
      <div className={styles.content}>
        <ul>
          {entries.map((entry) => {
            return (
              <PokemonDisplay
                key={entry.url}
                name={entry.name}
                url={entry.url}
              />
            );
          })}
        </ul>
        <div className={styles.navButton}>
          <button
            className={
              currentPage === 1 || numberOfPages === 0
                ? styles.inactive
                : styles.prev
            }
            onClick={handleClickPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
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
            onClick={handleClickNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              viewBox="0 -960 960 960"
              width="48"
            >
              <path d="m304-82-56-57 343-343-343-343 56-57 400 400L304-82Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
