import { useMemo } from "react";
import { Pokemon } from "../redux/api/models/Pokemon";
import { useGetAllPokemonQuery } from "../redux/api/pokemonApi";
import { useAppSelector } from "../redux/hooks";

export type UseSearchParams = {
  key?: string;
  onlyFavorites?: boolean;
};

export type UseSearchReturn = {
  isFetching: boolean;
  pokemonList: Pokemon[];
  refetch: () => void;
};

export const useSearchPokemon = ({ key, onlyFavorites }: UseSearchParams) => {
  const { data, refetch, isFetching } = useGetAllPokemonQuery({
    infinityScroll: true,
  });
  const favorites = useAppSelector((state) => state.pokemon.favorites);

  const filteredPokemon: Pokemon[] = useMemo(() => {
    const trimmedKey = key?.trim().toLowerCase();

    if (!data) return [];
    if (!trimmedKey && !onlyFavorites) return data?.results;

    return data?.results.filter((pokemon) => {
      if (onlyFavorites && trimmedKey) {
        return (
          favorites.includes(pokemon.id) && pokemon.name.includes(trimmedKey)
        );
      }

      if (onlyFavorites) {
        return favorites.includes(pokemon.id);
      }

      if (trimmedKey) {
        return pokemon.name.includes(trimmedKey);
      }
    });
  }, [data, favorites, key, onlyFavorites]);

  return {
    isFetching,
    pokemonList: filteredPokemon,
    refetch,
  };
};
