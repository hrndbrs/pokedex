import React, { useEffect, useState } from "react";
import axios from "axios";

const DisplayPokemon = ({ name, url }) => {
  // const index = Number(url.slice(34, -1));

  const [imageURL, setImageURL] = useState("");
  const APIBase = "https://pokeapi.co/api/v2/";
  const index = url.slice(34, -1);
  const pokemonName = name.charAt(0).toUpperCase() + name.slice(1)

  const pokemonImage = () => {
    axios
      .get(APIBase + "pokemon/" + name)
      .then((res) => {
        setImageURL(res.data.sprites.front_default);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    pokemonImage();
  }, []);

  return (
    <li>
      <a href={"/pokemon/" + name}>
        <img alt={name} src={imageURL} />
        <h3>
          {index}. {pokemonName}
        </h3>
      </a>
    </li>
  );
};

export default DisplayPokemon;
