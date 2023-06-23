"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import styles from "./styles/Entry.module.css";
import NavigatePage from "./components/NavigatePage";
import InfoSection from "./components/InfoSection";
import ActiveContainerSelector from "./components/ActiveContainerSelector";

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
  let id;
  const data = await axios
    .get(rootURL + "pokemon/" + name)
    .then((res) => {
      id = res.data.id;
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });

  const species = await axios
    .get(rootURL + "pokemon-species/" + id)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      data,
      species,
    },
  };
};

const PokemonDetailPage = ({ data, species }) => {
  const { id, sprites, types } = data;
  
  const { names, flavor_text_entries, evolution_chain, habitat } = species;
  
  const name = names.filter((name) => name.language.name === "en")[0].name;
  
  const pokemonTypes = types.map((type) => {
    let index;
    switch (type.slot) {
      case 1:
        index = "first";
        break;
      case 2:
        index = "second";
        break;
    }
    return { index, name: type.type.name };
  });

  const APInitState = [
    {
      id: id - 1,
      name: false,
      sprite: "",
    },
    {
      id: id + 1,
      name: false,
      sprite: "",
    },
  ];

  const infoInitState = {
    evolutionary: {},
    description: "NO DATA AVAILABLE",
  };

  const homeButtonSize = 68;
  
  const adjacentSpriteSize = 84;
  
  const mainImageSize = 480;
  
  const spriteSize = 144;

  const router = useRouter();
  
  const path = router.asPath;
  
  const [info, setInfo] = useState(infoInitState);

  const [adjacentPokemon, setAdjacentPokemon] = useState(APInitState);

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

  const fetchAdjPokemon = (index, id) => {
    axios
      .get(`${rootURL}pokemon/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setAdjacentPokemon((prevState) => {
          const temp = [...prevState];
          temp[index] = {
            ...temp[index],
            id,
            name: data.name,
            sprite: data.sprites.front_default,
          };
          return temp;
        });
      })
      .catch((err) => console.error(err));
  };

  const fetchHabitat = () => {
    axios
      .get(habitat.url)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    setAdjacentPokemon(APInitState);
    
    setInfo(infoInitState)

    if (habitat) fetchHabitat();
    
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
      fetchAdjPokemon(0, id - 1);
    }

    if (id !== 1010) {
      fetchAdjPokemon(1, id + 1);
    }

    if (path.includes("#")) {
      activeContainer(path.split("#")[1] || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <>
      <nav>
        <button
          onClick={() => {
            router.push("/main");
          }}
        >
          <Image
            src="/logos/home.svg"
            width={homeButtonSize}
            height={homeButtonSize}
            alt="to main"
          />
        </button>
        <ActiveContainerSelector/>
      </nav>
      <section>
        <div>
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
          <span>#{`${"0".repeat(4 - id.toString().length)}${id}`}</span>
          <span>{name.toUpperCase()}</span>
          <div>
            {adjacentPokemon.map((entry, index) => {
              switch (entry.name) {
                case false:
                  break;
                default:
                  return (
                    <NavigatePage
                      key={entry.id}
                      id={index}
                      name={entry.name}
                      sprite={entry.sprite}
                      size={adjacentSpriteSize}
                    />
                  );
              }
            })}
          </div>
        </div>
        <InfoSection
          types={pokemonTypes}
          description={info.description}
          data={data}
        />
      </section>
    </>
  );
};

export default PokemonDetailPage;
