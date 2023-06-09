"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import styles from "./styles/Entry.module.css";

const imageBaseURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const rootURL = process.env.NEXT_PUBLIC_API_URL;

export const getStaticPaths = async () => {
  const data = await axios
    .get(rootURL + "pokemon?limit=1010")
    .then((res) => res.data.results)
    .catch((err) => {
      console.error(err);
    });

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
  // const requests = [
  //   fetch(rootURL + "pokemon/" + name),
  //   fetch(rootURL + "pokemon-species/" + name),
  // ];

  // const data = Promise.all(requests)
  //   .then((res) => {
  // Promise.all(
  //   res.map((item) => {
  //     return item.data.json();
  //   })
  // );
  // return res.json()
  // })
  // .then(data => console.log(data))
  // .catch((e) => console.log("fetch was unsuccessful" + e));
  const data = await axios
    .get(rootURL + "pokemon/" + name)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
    });

  const species = await axios
    .get(rootURL + "pokemon-species/" + name)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      // pokemon: data1,
      // additional: data2,
      data,
      species,
    },
  };
};

const PokemonDetailPage = ({ data, species }) => {
  const { name, id, abilities, height, weight, moves, sprites } = data;
  const { flavor_text_entries, evolution_chain } = species;
  const router = useRouter();

  const [info, setInfo] = useState({
    evolutionary: {},
    description: "NO DATA AVAILABLE",
  });

  const [adjacentPokemon, setAdjacentPokemon] = useState([
    {
      id: id - 1,
      name: false,
      sprite: false,
    },
    {
      id: id + 1,
      name: false,
      sprite: false,
    },
  ]);

  const adjacentSpriteSize = 84;
  const mainImageSize = 400;
  const spriteSize = 144;

  const resetAdjPokemon = (payload) => {
    setAdjacentPokemon((prevState) => {
      const initial = [...prevState];
      const modified = initial.map((entry) => ({
        ...entry,
        id: entry.id + payload,
        name: false,
      }));
      return modified;
    });
  };

  const evolutionChain = async (link) => {
    try {
      await axios
        .get(link)
        .then((res) =>
          setInfo((state) => ({ ...state, evolutionary: res.data }))
        );
    } catch (err) {
      console.error(`${err}`);
    }
  };

  const fetchAdjPokemon = (index) => {
    axios
      .get(`${rootURL}pokemon/${adjacentPokemon[index].id.toString()}`)
      .then((res) => res.data)
      .then((data) => {
        setAdjacentPokemon((prevState) => {
          const temp = [...prevState];
          temp[index] = {
            ...temp[index],
            name: data.name,
            sprite: data.sprites.front_default,
          };
          return temp;
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    evolutionChain(evolution_chain.url);
    if (flavor_text_entries.length !== 0) {
      setInfo((state) => ({
        ...state,
        description: flavor_text_entries
          .filter((entry) => entry.language.name === "en")[0]
          .flavor_text.replace("", " "),
      }));
    }
    if (id !== 1) {
      fetchAdjPokemon(0);
    }

    if (id !== 1010) {
      fetchAdjPokemon(1);
    }
  }, [name]);

  console.log(adjacentPokemon);

  return (
    <div>
      <button
        onClick={() => {
          router.push("/main");
        }}
      >
        to Main
      </button>
      <section>
        <Image
          src={imageBaseURL + id + ".png"}
          alt={name}
          height={mainImageSize}
          width={mainImageSize}
        />
        <Image
          src={sprites.front_default}
          alt={`${name} sprite`}
          height={spriteSize}
          width={spriteSize}
        />
        <span>{name}</span>
      </section>

      <section>
        {adjacentPokemon.map((entry, index) => {
          if (index === 0) index = -1;
          switch (entry.name) {
            case false:
              return <></>;
            default:
              return (
                <NavigatePage
                  key={entry.id}
                  id={index}
                  name={entry.name}
                  sprite={entry.sprite}
                  size={adjacentSpriteSize}
                  onClick={resetAdjPokemon}
                />
              );
          }
        })}
        <p>{info.description}</p>
      </section>
    </div>
  );
};

export const NavigatePage = ({ id, name, sprite, size, onClick }) => {
  return (
    <Link
      className={id === 0 ? styles.prev : styles.next}
      href={`/pokemon/${name}`}
      onClick={() => {
        onClick(id);
      }}
    >
      {/* <Image src="/logos/pokeball-02.svg" width="60" height="60" alt="pokeball"> */}
      <Image src={sprite} alt={name} width={size} height={size} />
      {/* </Image> */}
    </Link>
  );
};

export default PokemonDetailPage;
