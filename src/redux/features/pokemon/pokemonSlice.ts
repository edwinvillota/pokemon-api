import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PokemonState = {
  favorites: number[];
  comparation: number[];
};

const initialState: PokemonState = {
  favorites: [],
  comparation: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<number>) => ({
      ...state,
      favorites: [...state.favorites, action.payload],
    }),
    removeFromFavorites: (state, action: PayloadAction<number>) => ({
      ...state,
      favorites: state.favorites.filter(
        (pokemonId) => pokemonId !== action.payload
      ),
    }),
  },
});

export const { addToFavorites, removeFromFavorites } = pokemonSlice.actions;

export default pokemonSlice.reducer;
