import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PokemonState = {
  favorites: number[];
  comparison: number[];
  isComparisonFull: boolean;
  isModalOpen: boolean;
};

const initialState: PokemonState = {
  favorites: [],
  comparison: [],
  isComparisonFull: false,
  isModalOpen: false,
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
    addToCompare: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;

      if (state.comparison.includes(pokemonId) || state.comparison.length >= 2)
        return state;

      return {
        ...state,
        comparison: [...state.comparison, pokemonId],
        isComparisonFull: state.comparison.length >= 1,
      };
    },
    removeFromCompare: (state, action: PayloadAction<number>) => ({
      ...state,
      comparison: state.comparison.filter(
        (pokemonId) => pokemonId !== action.payload
      ),
      isComparisonFull: !(state.comparison.length >= 1),
    }),
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  addToCompare,
  removeFromCompare,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
