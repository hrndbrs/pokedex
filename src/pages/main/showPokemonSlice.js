import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const APIBase = "https://pokeapi.co/api/v2/";

// export const showPokemon = createAsyncThunk(
//   "main/showPokemon",
//   async () => {
//     const response = await axios.get(APIBase + "pokemon?limit=1008");
//     return response.data.results;
//   }
// );

const showPokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    data: [],
    isLoading: false,
  },
  reducer: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(showPokemon.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(showPokemon.fulfilled, (state, action) => {
//         state.data = action.payload;
//         state.isLoading = false;
//       })
//       .addCase(showPokemon.rejected, (state) => {
//         state.isLoading = false;
//       });
//   },
// });

// export const searchSelectors = {
//   getPokemon: (state) => state.pokemon.data,
//   loading: (state) => state.pokemon.isLoading,
});

export default showPokemonSlice.reducer;
