import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonItem, Pokemon } from "./models/Pokemon";

export type PaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string | null;
  results: T[];
};

export const pokemonSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2" }),
  endpoints: (builder) => ({
    getAllPokemon: builder.query<PaginatedResponse<Pokemon>, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const { data: pokemonListData } = await fetchWithBQ("/pokemon");

        const pokemonListResponse =
          pokemonListData as PaginatedResponse<PokemonItem>;
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
    }),
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `/pokemon/${name}`,
    }),
  }),
});

export const { useGetAllPokemonQuery } = pokemonSlice;
