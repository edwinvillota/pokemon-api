import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../services/client/apiClient";

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
  extraReducers: (builder) => {
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      state.pokemon = action.payload;
    });
  },
});

export const {} = pokemonSlice.actions;

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async () => {
    const response = await apiClient.get();
    return response;
  }
);

export default pokemonSlice.reducer;
