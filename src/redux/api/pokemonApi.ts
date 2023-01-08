import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { PokemonItem, Pokemon } from "./models/Pokemon";

export type PaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
};

export type GetAllPokemonParams = {
  infinityScroll?: boolean;
};

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<
      PaginatedResponse<Pokemon>,
      GetAllPokemonParams
    >({
      async queryFn(args, api, _extraOptions, fetchWithBQ) {
        const currentState = api.getState() as RootState;
        const currentData = pokemonSlice.endpoints.getAllPokemon.select({
          infinityScroll: true,
        })(currentState).data;

        let pokemonListResponse: PaginatedResponse<PokemonItem>;

        if (args.infinityScroll && currentData) {
          const { data } = await fetchWithBQ(
            currentData.next.replace(BASE_URL, "")
          );
          pokemonListResponse = data as PaginatedResponse<PokemonItem>;
        } else {
          const { data } = await fetchWithBQ("/pokemon");
          pokemonListResponse = data as PaginatedResponse<PokemonItem>;
        }

        const pokemonList = pokemonListResponse.results;

        const promises = pokemonList.map((pokemonItem) =>
          fetchWithBQ(`/pokemon/${pokemonItem.name}`)
        );

        const pokemonResponses = (await Promise.all(promises)) as {
          data: Pokemon;
        }[];

        const results = pokemonResponses?.map((response) => response.data);

        return {
          data: {
            count: pokemonListResponse.count,
            previous: pokemonListResponse.previous,
            next: pokemonListResponse.next,
            results,
          },
        };
      },
      merge: (currentCache, newResponse, { arg }) => {
        if (arg.infinityScroll) {
          newResponse.results = [
            ...currentCache.results,
            ...newResponse.results,
          ];
        }
        return newResponse;
      },
    }),
    getPokemonByName: builder.query<Pokemon, string | undefined>({
      query: (name) => `/pokemon/${name}`,
    }),
  }),
});

export const { useGetAllPokemonQuery, useGetPokemonByNameQuery } = pokemonSlice;
