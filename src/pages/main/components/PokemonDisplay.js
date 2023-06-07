import React, { Component } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles/pokemonDisplay.module.css";
import Image from "next/image";
import { types } from "@/assets/static";

const rootURL = process.env.NEXT_PUBLIC_API_URL;
// const imageLink = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
const imageLink =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export function ShowType({ typeName }) {
  const size = 28;
  const filteredType = types.filter((type) => {
    return type.name === typeName;
  });
  const imagePath = filteredType[0].image;
  return (
    <div className={styles.type}>
      <Image src={imagePath} alt={typeName} width={size} height={size} />
    </div>
  );
}

export default class PokemonDisplay extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      index: "",
      types: [],
      imageURL: "",
      loaded: false,
    };
  }

  componentDidMount() {
    const { name, url } = this.props;
    let index = url.slice(34, -1);

    const image = imageLink + index + ".png";

    if (index.length < 3) {
      for (let i = 0; i <= 3 - index.length; i++) {
        index = "0" + index;
      }
    }

    axios
      .get(rootURL + "pokemon/" + name)
      .then((response) => {
        this.setState({
          name: response.data.species.name,
          index: index,
          imageURL: image,
          types: response.data.types,
        });
      })
      .then(() => this.setState({ loaded: true }))
      .catch((err) => console.error(err));
  }

  render() {
    const { name, index, types, imageURL, loaded } = this.state;
    const pokemonName = name.toUpperCase();
    const size = 216;

    return (
      <>
        <li className={styles.card}>
          {loaded && (
            <Link className={styles.entry} href={"/pokemon/" + name}>
              <div className={styles.typeLogos}>
                {types.map((type) => {
                  return (
                    <ShowType
                      key={pokemonName}
                      typeName={type.type.name}
                    ></ShowType>
                  );
                })}
              </div>
              <Image
                className={styles.img}
                alt={pokemonName}
                src={imageURL}
                width={size}
                height={size}
              />
              <div className={styles.info}>
                <h4>{`No ${index}`}</h4>
                <h3>{pokemonName}</h3>
              </div>
            </Link>
          )}
        </li>
      </>
    );
  }
}
