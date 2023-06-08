import React from "react";
import axios from "axios";

const imageBaseURL =
  "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
const rootURL = process.env.NEXT_PUBLIC_API_URL;

export const getStaticPaths = async () => {
  const data = await axios
    .get(rootURL + "pokemon?limit=1010")
    .then((res) => res.data.results)
    .catch((err) => {
      console.error(err);
    });
  // const data = await response.data;

  const paths = data.map((datum) => {
    return {
      params: {
        name: datum.name,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const name = context.params.name;
  const res = await axios
    .get(rootURL + "pokemon/" + name)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      pokemon: res,
    },
  };
};

const PokemonDetailPage = ({ pokemon }) => {
  return <div>
    {pokemon.species.name}
  </div>;
};

export default PokemonDetailPage;
