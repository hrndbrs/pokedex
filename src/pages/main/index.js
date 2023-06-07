"use Client";
import React, { useEffect, useState } from "react";
import Searchbar from "@/components/Searchbar";
import axios from "axios";
import PokemonDisplay from "./components/PokemonDisplay";
import NavigationButton from "./components/NavigationButton";
import styles from "./styles/main.module.css";

const rootURL = process.env.NEXT_PUBLIC_API_URL;

export const Context = React.createContext();

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
      .get(rootURL + "pokemon?limit=1008")
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
    <div className={`container ${styles.container}`}>
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
        <Context.Provider
          value={{
            currentPage: currentPage,
            numberOfPages: numberOfPages,
          }}
        >
          <NavigationButton
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
          />
        </Context.Provider>
      </div>
    </div>
  );
};

export default Main;
