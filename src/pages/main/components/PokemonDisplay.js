import React, { Component } from "react";
import { store } from "@/pages/store";
import axios from "axios";

export default class PokemonDisplay extends Component {
  constructor() {
    super();

    this.state = {
      imageURL: "",
    };
  }

  componentDidMount() {
    const APIBase = "https://pokeapi.co/api/v2/";
    const { name } = this.props;

    axios
      .get(APIBase + "pokemon/" + name)
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
    // const index = url.slice(34, -1);
    const pokemonName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <li>
        <a href={"/pokemon/" + name}>
          <img alt={pokemonName} src={imageURL} />
          <h3>
            {pokemonName}
          </h3>
        </a>
      </li>
    );
  }
}
