import React, { Component } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles/pokemonDisplay.module.css";
import Image from "next/image";
import { withPunct, types } from "@/assets/static";

const rootURL = process.env.NEXT_PUBLIC_API_URL;
const imageLink =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export function ShowType({ typeName }) {
  const size = 28; // 3:2
  const filteredType = types.filter((type) => {
    return type.name === typeName;
  });

  const imagePath = filteredType[0].image2;
  return (
    <div className={`${styles.icon} ${typeName}`}>
      <Image src={imagePath} alt={typeName} width={size} height={size} />
    </div>
  );
}

const nameCorrection = (name) => {
  let correctedName = name;

  if (!withPunct.includes(name)) {
    correctedName = name.replace("-", " ");
  }

  if (correctedName.includes("-m")) {
    correctedName = correctedName.replace("-m", " ♂");
  } else if (correctedName.includes("-f")) {
    correctedName = correctedName.replace("-f", " ♀");
  }

  correctedName = correctedName.toUpperCase();

  return correctedName;
};

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
    const size = 200;
    const pokemonName = nameCorrection(name);

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
