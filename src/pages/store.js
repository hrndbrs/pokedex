import { configureStore } from "@reduxjs/toolkit";
// import pokemonReducer from "./main/showPokemonSlice";
import DisplayPokemonSlice from "./main/components/DisplayPokemonSlice";

export const store = configureStore({
  reducer: {
    // pokemon: pokemonReducer,
    display : DisplayPokemonSlice,
  },
});
