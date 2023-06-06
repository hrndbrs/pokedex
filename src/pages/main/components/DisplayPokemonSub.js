import React, { Component } from "react";
import axios from "axios";

export default class DisplayPokemonSub extends Component {
  constructor() {
    super();

    this.state = {
      imageURL: "",
    };
  }

  componentDidMount() {
    const APIBase = "https://pokeapi.co/api/v2/";

    axios
      .get(APIBase + "pokemon/" + this.props.name)
      .then((response) => response.data.sprites.front_default)
      .then((res) => {
        this.setState(() => {
          return { imageURL: res };
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const index = this.props.url.slice(34, -1);
    const pokemonName =
      this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    return (
      <li>
        <a href={"/pokemon/" + name}>
          <img alt={pokemonName} src={this.state.imageURL} />
          <h3>
            {index}. {pokemonName}
          </h3>
        </a>
      </li>
    );
  }
}
