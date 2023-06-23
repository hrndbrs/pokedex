"use Client";
import React, { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar";
import axios from "axios";
import PokemonDisplay from "./components/PokemonDisplay";
import NavigationButton from "./components/NavigationButton";
import styles from "./styles/Main.module.css";

const rootURL = process.env.NEXT_PUBLIC_API_URL;

export const Context = React.createContext();

const Main = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const entries = filteredData.slice(firstIndex, lastIndex);
  const numberOfPages = Math.ceil(filteredData.length / recordsPerPage);

  const fetchPokemon = () => {
    axios
      .get(rootURL + "pokemon?limit=1010")
      .then((res) => {
        const results = res.data.results;
        setData(results);
        setFilteredData(results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
    setCurrentPage(1);
    setFilteredData(
      data.filter((pokemon) => {
        // return pokemon.name.includes(payload.toLowerCase());
        return pokemon.name.startsWith(payload.toLowerCase());
      })
    );
  };

  return (
    <div className={`container ${styles.container}`}>
      <section className={styles.header}>
        <Searchbar handleFilter={handleFilter} />
      </section>
      <section className={styles.content}>
        <ul>
          {entries.map((entry) => {
            const { name } = entry;

            return <PokemonDisplay key={`display ${name}`} name={name} />;
          })}
        </ul>
        <Context.Provider
          value={{
            currentPage,
            numberOfPages,
          }}
        >
          <NavigationButton
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
          />
        </Context.Provider>
      </section>
    </div>
  );
};

export default Main;
