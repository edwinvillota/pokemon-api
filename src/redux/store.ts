import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import pokemonReducer from "./features/pokemon/pokemonSlice";
import { pokemonApi } from "./api/pokemonApi";

export function setupStore(
  preloadedState?: ConfigureStoreOptions["preloadedState"]
) {
  return configureStore({
    preloadedState,
    reducer: {
      pokemon: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(pokemonApi.middleware),
  });
}

export const store = setupStore();

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
