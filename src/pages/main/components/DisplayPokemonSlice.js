import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  index: "",
};

const displayPokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducer: {
    getName(state, action) {
      state.name = action.payload;
    },
    getIndex(state, action) {
      state.index = action.payload;
    },
  },
});

export const { getName, getIndex } = displayPokemonSlice.actions;
export default displayPokemonSlice.reducer;
