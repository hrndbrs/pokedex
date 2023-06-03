import React from "react";

const DisplayPokemon = ({ name, url }) => {
  const pokemonURL = url;
  const index = Number(pokemonURL.slice(34, -1))

  return <div>DisplayPokemon</div>;
};

export default DisplayPokemon;
