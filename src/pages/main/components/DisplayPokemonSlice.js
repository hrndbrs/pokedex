import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const displayPokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducer: {
    selectPokemon(state, action) {
        state.name = action.payload
    }
  },
});

export const { selectPokemon } = displayPokemonSlice.actions
export default displayPokemonSlice.reducer