import React, { Component } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles/pokemonDisplay.module.css";
import Image from "next/image";

const rootURL = process.env.NEXT_PUBLIC_API_URL;
const imageLink = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

export default class PokemonDisplay extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      index: "",
      imageURL: "",
      loaded: false,
    };
  }

  componentDidMount() {
    const { name, url } = this.props;
    let index = url.slice(34, -1);

    if (index.length < 3) {
      for (let i = 0; i <= 3 - index.length; i++) {
        index = "0" + index;
      }
    }

    this.setState({index: index})

    const image = imageLink + index + ".png";

    axios
      .get(rootURL + "pokemon/" + name)
      .then((response) => {
        const speciesName = response.data.species.name;
        this.setState({
          name: speciesName,
          imageURL: image,
        });
      })
      .then(() => this.setState({ loaded: true }))
      .catch((err) => console.error(err));
  }

  render() {
    const { name, index, imageURL, loaded } = this.state;
    const pokemonName = name.toUpperCase();
    const size = 216;

    return (
      <>
        <li className={styles.card}>
          {loaded && (
            <Link className={styles.entry} href={"/pokemon/" + name}>
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
