import React, { Component } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./styles/pokemonDisplay.module.css";

const rootURL = process.env.NEXT_PUBLIC_API_URL;

export default class PokemonDisplay extends Component {
  constructor() {
    super();

    this.state = {
      imageURL: "",
    };
  }

  componentDidMount() {
    const { name } = this.props;

    axios
      .get(rootURL + "pokemon/" + name)
      .then((response) => response.data.sprites.front_default)
      .then((res) => {
        this.setState(() => {
          return { imageURL: res };
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { name, url } = this.props;
    const { imageURL } = this.state;
    const index = url.slice(34, -1);
    const pokemonName = name.toUpperCase();

    return (
      <li className={styles.entry}>
        <Link href={"/pokemon/" + name}>
          <img alt={pokemonName} src={imageURL} />
          <div className={styles.info}>
            <h5>{`No ${index}`}</h5>
            <h3>{pokemonName}</h3>
          </div>
        </Link>
      </li>
    );
  }
}
