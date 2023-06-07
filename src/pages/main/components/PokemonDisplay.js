import React, { Component } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles/pokemonDisplay.module.css";

const rootURL = process.env.NEXT_PUBLIC_API_URL;

export default class PokemonDisplay extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      imageURL: "",
    };
  }

  componentDidMount() {
    const { name } = this.props;

    axios
      .get(rootURL + "pokemon/" + name)
      .then((response) => {
        const speciesName = response.data.species.name;
        const image = response.data.sprites.front_default;
        // console.log(`${name} ${image}`)
        this.setState({
          name: speciesName,
          imageURL: image,
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { url } = this.props;
    const { name, imageURL } = this.state;
    const index = url.slice(34, -1);
    // const pokemonName = name.replace("-", " ").toUpperCase();
    const pokemonName = name.toUpperCase();

    return (
      <li className={styles.card}>
        <Link className={styles.entry} href={"/pokemon/" + name}>
          <img alt={pokemonName} src={imageURL} />
          <div className={styles.info}>
            <h4>{`No ${index}`}</h4>
            <h3>{pokemonName}</h3>
          </div>
        </Link>
      </li>
    );
  }
}
