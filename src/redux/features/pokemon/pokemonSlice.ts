import { createSlice } from "@reduxjs/toolkit";

type PokemonState = {
  isLoading: boolean;
  pokemon: any[];
};

const initialState: PokemonState = {
  isLoading: false,
  pokemon: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
});

export default pokemonSlice.reducer;
