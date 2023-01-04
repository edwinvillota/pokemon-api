import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./features/pokemon/pokemonSlice";
import { pokemonSlice } from "./api/pokemonApi";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonSlice.reducerPath]: pokemonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
